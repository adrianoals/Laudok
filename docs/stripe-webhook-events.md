# Eventos de Webhook Stripe - Assinaturas

## Visão Geral

A Stripe envia webhooks automaticamente para vários eventos relacionados a assinaturas. Este documento lista os principais eventos que você pode usar para monitorar mudanças no status das assinaturas.

## Eventos Principais de Assinatura

### 1. Criação e Ativação

| Evento | Quando é Enviado | Status da Assinatura |
|--------|------------------|---------------------|
| `checkout.session.completed` | Quando o checkout é concluído | Pode ser `active`, `trialing`, `incomplete`, etc. |
| `customer.subscription.created` | Quando uma assinatura é criada | `incomplete`, `trialing`, `active`, etc. |
| `customer.subscription.trial_will_end` | 3 dias antes do fim do trial | `trialing` |
| `invoice.payment_succeeded` | Quando um pagamento é bem-sucedido | Geralmente `active` |

### 2. Mudanças de Status

| Evento | Quando é Enviado | Status Anterior → Novo |
|--------|------------------|------------------------|
| `customer.subscription.updated` | Quando a assinatura é atualizada | Qualquer → Qualquer |
| `customer.subscription.deleted` | Quando a assinatura é cancelada | `active` → `canceled` |
| `customer.subscription.paused` | Quando a assinatura é pausada | `active` → `paused` |
| `customer.subscription.resumed` | Quando a assinatura é retomada | `paused` → `active` |

### 3. Pagamentos e Faturas

| Evento | Quando é Enviado | Descrição |
|--------|------------------|-----------|
| `invoice.payment_succeeded` | Pagamento bem-sucedido | Assinatura geralmente fica `active` |
| `invoice.payment_failed` | Pagamento falhou | Assinatura pode ficar `past_due` ou `unpaid` |
| `invoice.created` | Nova fatura criada | Antes do pagamento |
| `invoice.finalized` | Fatura finalizada | Pronta para pagamento |

### 4. Problemas e Cancelamentos

| Evento | Quando é Enviado | Status da Assinatura |
|--------|------------------|---------------------|
| `customer.subscription.past_due` | Assinatura em atraso | `past_due` |
| `customer.subscription.unpaid` | Assinatura não paga | `unpaid` |
| `customer.subscription.deleted` | Assinatura cancelada | `canceled` |

## Status Possíveis de Assinatura

```
incomplete → trialing → active → past_due → unpaid → canceled
                ↓                              ↑
            paused ←──────────────────────────┘
```

- **`incomplete`**: Checkout iniciado, mas pagamento não concluído
- **`trialing`**: Em período de trial
- **`active`**: Assinatura ativa e pagando
- **`past_due`**: Pagamento em atraso (tentando cobrar)
- **`unpaid`**: Pagamento falhou completamente
- **`canceled`**: Assinatura cancelada
- **`paused`**: Assinatura pausada (não cobra, mas mantém acesso)

## Configuração Recomendada

### Eventos Mínimos para Monitorar Assinaturas

```typescript
// Eventos essenciais
[
  'checkout.session.completed',        // Checkout concluído
  'customer.subscription.created',      // Assinatura criada
  'customer.subscription.updated',      // Status mudou
  'customer.subscription.deleted',      // Cancelada
  'invoice.payment_succeeded',          // Pagamento OK
  'invoice.payment_failed',            // Pagamento falhou
]
```

### Eventos Completos (Recomendado)

```typescript
// Todos os eventos relevantes
[
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'customer.subscription.paused',
  'customer.subscription.resumed',
  'customer.subscription.trial_will_end',
  'customer.subscription.past_due',
  'customer.subscription.unpaid',
  'invoice.created',
  'invoice.finalized',
  'invoice.payment_succeeded',
  'invoice.payment_failed',
]
```

## Exemplo de Tratamento

```typescript
switch (event.type) {
  case 'customer.subscription.created':
    // Nova assinatura criada
    const newSubscription = event.data.object as Stripe.Subscription;
    console.log('Status:', newSubscription.status); // incomplete, trialing, active
    break;

  case 'customer.subscription.updated':
    // Status mudou
    const updatedSubscription = event.data.object as Stripe.Subscription;
    console.log('Novo status:', updatedSubscription.status);
    
    if (updatedSubscription.status === 'active') {
      // Ativar acesso do usuário
    } else if (updatedSubscription.status === 'canceled') {
      // Desativar acesso do usuário
    }
    break;

  case 'customer.subscription.deleted':
    // Assinatura cancelada
    const deletedSubscription = event.data.object as Stripe.Subscription;
    // Remover acesso do usuário
    break;

  case 'invoice.payment_failed':
    // Pagamento falhou
    const failedInvoice = event.data.object as Stripe.Invoice;
    // Notificar usuário, tentar cobrar novamente
    break;
}
```

## Fluxo Típico de Uma Assinatura

```
1. checkout.session.completed
   ↓
2. customer.subscription.created (status: incomplete)
   ↓
3. invoice.payment_succeeded
   ↓
4. customer.subscription.updated (status: active)
   ↓
   [Mensalmente]
   ↓
5. invoice.created
   ↓
6. invoice.payment_succeeded
   ↓
   [Se falhar]
   ↓
7. invoice.payment_failed
   ↓
8. customer.subscription.updated (status: past_due)
   ↓
   [Se continuar falhando]
   ↓
9. customer.subscription.updated (status: unpaid)
   ↓
10. customer.subscription.deleted (canceled)
```

## Resumo

✅ **Sim, a Stripe envia webhooks automaticamente** quando:
- Assinatura é criada
- Status muda (active → canceled, active → past_due, etc.)
- Pagamento é bem-sucedido ou falha
- Assinatura é cancelada, pausada ou retomada

🔧 **Recomendação**: Configure pelo menos os eventos essenciais listados acima para ter controle completo sobre o ciclo de vida das assinaturas.

