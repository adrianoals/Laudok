# Configurando Webhook Stripe para Backend Separado

## Visão Geral

Este documento explica como configurar o webhook da Stripe para apontar diretamente para o backend do sistema principal, mantendo o site apenas para checkout.

## Arquitetura Recomendada

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   Site (Next.js)│         │   Stripe         │         │  Backend/Sistema │
│                 │         │   Dashboard      │         │  Principal       │
│  - Checkout     │────────▶│                  │────────▶│  - Webhook       │
│  - Marketing    │         │  - Webhooks      │         │  - Lógica        │
│  - Landing      │         │                  │         │  - Banco de Dados│
└─────────────────┘         └──────────────────┘         └─────────────────┘
```

## Por Que Separar?

### ✅ Vantagens

1. **Separação de Responsabilidades**
   - Site: Marketing, checkout, landing pages
   - Backend: Lógica de negócio, banco de dados, autenticação

2. **Segurança**
   - Backend não precisa expor rotas públicas do site
   - Webhook secret fica apenas no backend
   - Menor superfície de ataque

3. **Escalabilidade**
   - Cada projeto escala independentemente
   - Backend pode ter infraestrutura diferente (servidor dedicado, etc.)

4. **Manutenibilidade**
   - Código mais organizado
   - Equipes podem trabalhar independentemente

## Como Configurar

### 1. No Stripe Dashboard

1. Acesse: https://dashboard.stripe.com/webhooks
2. Clique em **Add endpoint** (ou **Create an event destination**)
3. Configure:
   - **Endpoint URL**: `https://backend.seudominio.com/api/webhooks/stripe`
   - **Description**: "Backend Principal - Processamento de Assinaturas"
   - **Events to send**: Selecione os eventos necessários (veja `docs/stripe-webhook-events.md`)

4. Copie o **Signing secret** (`whsec_...`)
5. Adicione no backend como variável de ambiente: `STRIPE_WEBHOOK_SECRET`

### 2. No Backend (Exemplo Node.js/Express)

```typescript
// routes/webhooks/stripe.ts
import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// IMPORTANTE: Desabilitar body parser para webhooks
router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['stripe-signature'] as string;

  if (!signature || !webhookSecret) {
    return res.status(400).json({ error: 'Missing signature or secret' });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  // Processar eventos
  switch (event.type) {
    case 'checkout.session.completed':
      // Processar checkout concluído
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
      break;

    case 'customer.subscription.updated':
      // Atualizar status da assinatura no banco
      await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
      break;

    case 'customer.subscription.deleted':
      // Cancelar assinatura no banco
      await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
      break;

    case 'invoice.payment_succeeded':
      // Processar pagamento bem-sucedido
      await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
      break;

    case 'invoice.payment_failed':
      // Notificar sobre falha de pagamento
      await handlePaymentFailed(event.data.object as Stripe.Invoice);
      break;
  }

  res.json({ received: true });
});

export default router;
```

### 3. No Site (Este Projeto)

**Opção A: Remover Webhook Completamente**

Se você não vai processar webhooks no site, pode remover:
- `src/app/api/webhooks/stripe/route.ts`
- Código relacionado à API PELIP (se não for usado no site)

**Opção B: Manter para Outros Propósitos**

Se quiser manter o webhook no site para outras funcionalidades (ex: analytics, logs), você pode:
- Manter o endpoint
- Processar apenas eventos não críticos
- Deixar o backend processar os eventos principais

## Variáveis de Ambiente

### No Site (`.env.local`)
```env
# Stripe Configuration (apenas para checkout)
STRIPE_SECRET_KEY=sk_test_...  # Para criar checkout sessions
STRIPE_PUBLISHABLE_KEY=pk_test_...  # Para frontend
NEXT_PUBLIC_APP_URL=https://site.seudominio.com
```

### No Backend (`.env`)
```env
# Stripe Configuration (para webhooks e operações)
STRIPE_SECRET_KEY=sk_test_...  # Para validar webhooks e buscar dados
STRIPE_WEBHOOK_SECRET=whsec_...  # Secret do webhook endpoint
```

## Fluxo Completo

### 1. Usuário Seleciona Plano (Site)
```
Site → /api/checkout → Stripe Checkout
```

### 2. Usuário Paga (Stripe)
```
Stripe → Processa pagamento
```

### 3. Webhook é Enviado (Stripe → Backend)
```
Stripe → POST https://backend.seudominio.com/api/webhooks/stripe
```

### 4. Backend Processa (Backend)
```
Backend → Valida webhook
Backend → Cria/atualiza usuário no banco
Backend → Ativa/desativa acesso
Backend → Envia notificações
```

## Exemplo: Backend em Python (Flask)

```python
from flask import Flask, request, jsonify
import stripe
import os

app = Flask(__name__)
stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')
webhook_secret = os.environ.get('STRIPE_WEBHOOK_SECRET')

@app.route('/api/webhooks/stripe', methods=['POST'])
def stripe_webhook():
    payload = request.get_data()
    sig_header = request.headers.get('Stripe-Signature')

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )
    except ValueError:
        return jsonify({'error': 'Invalid payload'}), 400
    except stripe.error.SignatureVerificationError:
        return jsonify({'error': 'Invalid signature'}), 400

    # Processar eventos
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        # Criar usuário no banco
        # ...
    
    return jsonify({'received': True}), 200
```

## Exemplo: Backend em PHP

```php
<?php
require_once 'vendor/autoload.php';

\Stripe\Stripe::setApiKey(getenv('STRIPE_SECRET_KEY'));
$webhook_secret = getenv('STRIPE_WEBHOOK_SECRET');

$payload = @file_get_contents('php://input');
$sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];

try {
    $event = \Stripe\Webhook::constructEvent(
        $payload, $sig_header, $webhook_secret
    );
} catch(\UnexpectedValueException $e) {
    http_response_code(400);
    exit();
} catch(\Stripe\Exception\SignatureVerificationException $e) {
    http_response_code(400);
    exit();
}

// Processar eventos
switch ($event->type) {
    case 'checkout.session.completed':
        $session = $event->data->object;
        // Criar usuário no banco
        break;
}

http_response_code(200);
?>
```

## Checklist de Configuração

- [ ] Criar endpoint de webhook no backend
- [ ] Configurar webhook no Stripe Dashboard apontando para o backend
- [ ] Adicionar `STRIPE_WEBHOOK_SECRET` no backend
- [ ] Testar webhook localmente (usar Stripe CLI com `--forward-to`)
- [ ] Implementar tratamento de todos os eventos necessários
- [ ] Adicionar logs para debugging
- [ ] Implementar retry/error handling
- [ ] Configurar monitoramento/alertas

## Testando Localmente

### Usando Stripe CLI

```bash
# No backend local
stripe listen --forward-to http://localhost:3001/api/webhooks/stripe

# Em outro terminal, disparar evento de teste
stripe trigger checkout.session.completed
```

## Segurança

### ✅ Boas Práticas

1. **Sempre validar assinatura do webhook**
   ```typescript
   stripe.webhooks.constructEvent(body, signature, webhookSecret);
   ```

2. **Usar HTTPS em produção**
   - Stripe só envia webhooks para URLs HTTPS

3. **Manter webhook secret seguro**
   - Nunca commitar no código
   - Usar variáveis de ambiente
   - Rotacionar periodicamente

4. **Implementar idempotência**
   - Verificar se evento já foi processado
   - Usar `event.id` como chave única

5. **Logs e monitoramento**
   - Registrar todos os eventos recebidos
   - Alertar sobre falhas persistentes

## Resumo

✅ **Sim, você pode (e deve) apontar o webhook para o backend separado**

- Site: Apenas checkout e marketing
- Backend: Processa webhooks e lógica de negócio
- Stripe: Envia webhooks diretamente para o backend

Esta arquitetura é mais segura, escalável e mantível.

