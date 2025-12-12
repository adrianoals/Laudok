# Tratamento de Erros no Webhook Stripe

## Visão Geral

Este documento explica como o sistema garante que usuários sejam criados na API PELIP mesmo quando ocorrem falhas no webhook do Stripe.

## Problema: Garantia de Criação de Usuário

Quando um pagamento é bem-sucedido no Stripe, o webhook é acionado para criar o usuário na API PELIP. Se esse processo falhar, precisamos garantir que o usuário seja criado eventualmente.

## Como Funciona o Retry do Stripe

O Stripe possui um sistema automático de retry para webhooks que falham:

| Status HTTP | Stripe Tenta Novamente? | Duração |
|-------------|------------------------|---------|
| 200-299 (Sucesso) | ❌ Não | - |
| 300-399 (Redirecionamento) | ❌ Não | - |
| 400-499 (Erro do Cliente) | ❌ Não | - |
| **500-599 (Erro do Servidor)** | ✅ **Sim** | **Até 3 dias** |

### Estratégia de Retry do Stripe

O Stripe usa **backoff exponencial** para tentar novamente:

- **1ª tentativa**: Imediata
- **2ª tentativa**: Após alguns minutos
- **3ª tentativa**: Após algumas horas
- **Continua**: Por até 3 dias

## Implementação Atual

### 1. Verificação de Duplicação

Antes de criar o usuário, verificamos se ele já foi criado:

```typescript
if (!subscription.metadata?.pelipUserId) {
  // Só cria se ainda não foi criado
}
```

Isso evita criar usuários duplicados se o webhook for chamado múltiplas vezes.

### 2. Retorno de Erro quando PELIP Falha

Se a API PELIP falhar, o webhook retorna erro 500:

```typescript
catch (pelipError) {
  console.error('Error creating user in PELIP:', pelipError);
  // Retorna erro para que o Stripe tente novamente
  return NextResponse.json(
    { error: 'Failed to create user in PELIP' },
    { status: 500 }
  );
}
```

**Por que isso é importante?**
- Se retornássemos 200 (sucesso), o Stripe não tentaria novamente
- Retornando 500, o Stripe tenta automaticamente por até 3 dias
- Aumenta significativamente a chance de sucesso

### 3. Salvamento de Metadata

Quando o usuário é criado com sucesso, salvamos informações na subscription:

```typescript
await stripe.subscriptions.update(subscriptionId, {
  metadata: {
    pelipUserId: pelipResponse.UserId,
    pelipCallbackUrl: pelipResponse.CallbackUrl,
    pelipCreatedAt: new Date().toISOString(),
  },
});
```

**Benefícios:**
- Rastreabilidade: sabemos quando e como o usuário foi criado
- Prevenção de duplicação: verificamos antes de criar
- Auditoria: histórico completo do processo

## Fluxo Completo com Tratamento de Erros

```
[Pagamento Bem-sucedido]
         ↓
[Stripe Envia Webhook]
         ↓
[Webhook Recebe Evento]
         ↓
[Verifica se já foi criado?]
    ↓           ↓
   Sim         Não
    ↓           ↓
[Log e retorna] [Tenta criar na PELIP]
                    ↓
              [Sucesso?]
              ↓       ↓
             Sim     Não
              ↓       ↓
    [Salva metadata] [Retorna 500]
              ↓       ↓
    [Retorna 200] [Stripe retenta]
                        ↓
                  [Tenta novamente...]
```

## Cenários de Falha e Recuperação

### Cenário 1: API PELIP Temporariamente Indisponível

**O que acontece:**
1. Webhook tenta criar usuário
2. API PELIP retorna erro (timeout, 500, etc.)
3. Webhook retorna 500
4. Stripe agenda retry automático
5. Após alguns minutos/horas, tenta novamente
6. Se API PELIP estiver disponível, usuário é criado

**Garantia:** ✅ Stripe tenta por até 3 dias

### Cenário 2: Erro de Validação na API PELIP

**O que acontece:**
1. Webhook tenta criar usuário
2. API PELIP retorna erro de validação (400)
3. Webhook retorna 500 (ou poderia retornar 400)
4. Stripe tenta novamente
5. Se o erro persistir, precisa de intervenção manual

**Ação necessária:** Verificar logs e corrigir dados

### Cenário 3: Webhook Chamado Múltiplas Vezes

**O que acontece:**
1. Stripe envia webhook
2. Usuário é criado com sucesso
3. Metadata é salva
4. Stripe envia webhook novamente (retry ou duplicado)
5. Webhook verifica metadata
6. Vê que `pelipUserId` já existe
7. Não tenta criar novamente
8. Retorna sucesso

**Garantia:** ✅ Sem duplicação de usuários

## Monitoramento e Logs

### Logs Importantes

O webhook registra os seguintes eventos:

```typescript
// Sucesso
console.log('User created in PELIP:', pelipResponse);

// Usuário já existe
console.log('User already created in PELIP:', subscription.metadata.pelipUserId);

// Erro
console.error('Error creating user in PELIP:', pelipError);
```

### Onde Verificar

1. **Logs do servidor**: Console/CloudWatch/Vercel Logs
2. **Stripe Dashboard**: Webhooks → Ver tentativas e erros
3. **Metadata da Subscription**: Verificar se `pelipUserId` foi salvo

## Melhorias Futuras (Opcional)

### 1. Fila de Retry Customizada

Implementar uma fila própria (Redis, banco de dados) para processar falhas:

```typescript
// Se PELIP falhar, adiciona na fila
await addToRetryQueue({
  email,
  userName,
  subscriptionId,
  attempts: 1,
  maxAttempts: 5
});
```

**Vantagem:** Mais controle sobre retries e notificações

### 2. Notificações de Falha

Enviar alertas quando falhas persistirem:

```typescript
if (attempts > 3) {
  await sendAlert({
    type: 'pelip_user_creation_failed',
    subscriptionId,
    email,
    error: pelipError
  });
}
```

### 3. Dashboard de Monitoramento

Criar interface para visualizar:
- Tentativas de criação de usuário
- Taxa de sucesso/falha
- Usuários pendentes de criação

## Checklist de Verificação

Após um pagamento, verifique:

- [ ] Webhook foi recebido (Stripe Dashboard)
- [ ] Usuário foi criado na API PELIP
- [ ] Metadata foi salva na subscription (`pelipUserId` existe)
- [ ] Logs não mostram erros
- [ ] Se houver erro, verificar se Stripe está tentando novamente

## Resumo

✅ **Garantias Implementadas:**
- Retry automático do Stripe (até 3 dias)
- Prevenção de duplicação (verificação de metadata)
- Rastreabilidade (metadata salva)
- Logs detalhados para debugging

⚠️ **Limitações:**
- Se API PELIP estiver offline por mais de 3 dias, precisa intervenção manual
- Erros de validação podem precisar correção manual

🔧 **Recomendações:**
- Monitorar logs regularmente
- Configurar alertas para falhas persistentes
- Considerar fila de retry customizada para casos críticos

