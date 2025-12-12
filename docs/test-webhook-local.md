# Como Testar Webhook Stripe Localmente

## Pré-requisitos

1. Ter o Stripe CLI instalado
2. Ter o projeto rodando localmente
3. Ter as variáveis de ambiente configuradas

## Passo a Passo

### 1. Instalar Stripe CLI (se ainda não tiver)

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Ou baixe de: https://stripe.com/docs/stripe-cli
```

### 2. Fazer Login no Stripe CLI

```bash
stripe login
```

Isso abrirá o navegador para autenticar. Após autenticar, volte ao terminal.

### 3. Iniciar o Servidor Local

Em um terminal, inicie o Next.js:

```bash
npm run dev
```

O servidor deve estar rodando em `http://localhost:3000`

### 4. Configurar Webhook Secret no .env.local

Antes de iniciar o `stripe listen`, você precisa do webhook secret. Execute:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

**IMPORTANTE**: Este comando vai mostrar algo como:

```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx (^C to quit)
```

Copie o `whsec_...` e adicione no seu `.env.local`:

```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

### 5. Manter o Stripe CLI Rodando

Deixe o terminal com `stripe listen` rodando. Ele vai:
- Receber eventos da Stripe
- Forward para seu localhost
- Mostrar logs de todos os eventos

### 6. Testar o Checkout

1. Abra o navegador em `http://localhost:3000`
2. Clique em um plano (Básico ou Profissional)
3. Preencha o checkout com cartão de teste:
   - **Cartão**: `4242 4242 4242 4242`
   - **Data**: Qualquer data futura (ex: 12/25)
   - **CVC**: Qualquer 3 dígitos (ex: 123)
   - **CEP**: Qualquer CEP válido (ex: 01310-100)
4. Complete o pagamento

### 7. Ver os Logs

Você verá logs em **dois lugares**:

#### A) Terminal do Stripe CLI
Mostra eventos recebidos e forwardados:
```
2024-01-15 10:30:45   --> checkout.session.completed [evt_xxx]
2024-01-15 10:30:45  <--  [200] POST http://localhost:3000/api/webhooks/stripe [evt_xxx]
```

#### B) Terminal do Next.js (npm run dev)
Mostra os logs detalhados que você configurou:
```
=== CHECKOUT.SESSION.COMPLETED ===
Session ID: cs_test_xxx
Customer Email: cliente@exemplo.com
...
=== DADOS COMPLETOS PARA ANÁLISE ===
{ ... }
```

## Testar Eventos Específicos (Sem Fazer Checkout Real)

Você pode disparar eventos de teste diretamente:

```bash
# Em outro terminal (com stripe listen rodando)
stripe trigger checkout.session.completed
stripe trigger invoice.payment_succeeded
stripe trigger customer.subscription.updated
stripe trigger customer.subscription.deleted
```

## Cartões de Teste

Use estes cartões para diferentes cenários:

| Cenário | Cartão | Resultado |
|---------|--------|-----------|
| **Sucesso** | `4242 4242 4242 4242` | Pagamento aprovado |
| **Falha** | `4000 0000 0000 0002` | Pagamento recusado |
| **3D Secure** | `4000 0025 0000 3155` | Requer autenticação |
| **Insufficient Funds** | `4000 0000 0000 9995` | Saldo insuficiente |

**Dados para todos:**
- Data: Qualquer data futura
- CVC: Qualquer 3 dígitos
- CEP: Qualquer CEP válido

## Verificar se Está Funcionando

### ✅ Sinais de que está funcionando:

1. **Stripe CLI mostra eventos:**
   ```
   --> checkout.session.completed [evt_xxx]
   <--  [200] POST http://localhost:3000/api/webhooks/stripe
   ```

2. **Terminal do Next.js mostra logs:**
   ```
   === CHECKOUT.SESSION.COMPLETED ===
   Session ID: cs_test_xxx
   ...
   ```

3. **Status 200 no Stripe CLI:**
   - Se aparecer `[200]` = webhook processado com sucesso
   - Se aparecer `[400]` ou `[500]` = há erro no código

### ❌ Problemas Comuns

**Problema**: `Missing stripe-signature or webhook secret`
- **Solução**: Verifique se `STRIPE_WEBHOOK_SECRET` está no `.env.local`

**Problema**: `Webhook signature verification failed`
- **Solução**: Use o `whsec_...` correto do `stripe listen` atual

**Problema**: Não recebe eventos
- **Solução**: 
  1. Verifique se `stripe listen` está rodando
  2. Verifique se o servidor Next.js está em `localhost:3000`
  3. Tente usar `stripe trigger` para testar

## Estrutura de Teste Completa

```bash
# Terminal 1: Servidor Next.js
npm run dev

# Terminal 2: Stripe CLI (forward webhooks)
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Terminal 3 (opcional): Disparar eventos de teste
stripe trigger checkout.session.completed
```

## O Que Você Vai Ver nos Logs

Com os logs detalhados que configuramos, você verá:

1. **Dados da Session** (checkout)
2. **Dados da Subscription** (assinatura)
3. **Dados do Customer** (cliente completo)
4. **JSON completo** para análise

Isso te ajuda a entender:
- Quais dados estão disponíveis
- Qual estrutura usar no banco
- O que enviar para a API PELIP depois

## Próximos Passos

Após testar e ver os logs:
1. Analise quais dados são realmente importantes
2. Decida quais campos salvar no banco
3. Melhore o endpoint da API PELIP com seu colega
4. Reimplemente a integração com os dados corretos

