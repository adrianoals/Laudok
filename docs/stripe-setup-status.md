# Status da Configuração Stripe - Laudok

## ✅ O que já está configurado

### 1. Produtos e Preços Criados no Stripe

| Plano | Product ID | Price ID | Valor |
|-------|------------|----------|-------|
| **Básico** | `prod_TZk8VLP6zIUjzP` | `price_1ScaeDP1IAVAPkrfWK70N4K0` | R$ 299,00/mês |
| **Profissional** | `prod_TZk8B9cTOEe11b` | `price_1ScaeEP1IAVAPkrf0q3eBJau` | R$ 599,00/mês |
| **Enterprise** | - | - | Sob consulta |

### 2. Código Atualizado

- ✅ `src/lib/stripe.ts` - Configurado com Price IDs padrão
- ✅ API routes criadas (`/api/checkout` e `/api/webhooks/stripe`)
- ✅ Páginas de checkout criadas
- ✅ Integração com API PELIP implementada

## ⚠️ O que ainda precisa ser configurado

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_... # Obtenha em: https://dashboard.stripe.com/apikeys
STRIPE_WEBHOOK_SECRET=whsec_... # Será obtido após configurar o webhook
STRIPE_PUBLISHABLE_KEY=pk_test_... # Obtenha em: https://dashboard.stripe.com/apikeys

# Stripe Price IDs (já criados, mas você pode sobrescrever se necessário)
STRIPE_PRICE_ID_BASICO=price_1ScaeDP1IAVAPkrfWK70N4K0
STRIPE_PRICE_ID_PROFISSIONAL=price_1ScaeEP1IAVAPkrf0q3eBJau

# PELIP API Configuration
PELIP_API_KEY=keyTesteParaTestarAcessoAAPIDeOutroAPP

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Em produção, use: https://seu-dominio.com
```

### 2. Configurar Webhook no Stripe Dashboard

**Para Desenvolvimento Local:**
1. Instale o Stripe CLI: `brew install stripe/stripe-cli/stripe`
2. Faça login: `stripe login`
3. Execute: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
4. Copie o `whsec_...` que aparece e adicione em `STRIPE_WEBHOOK_SECRET`

**Para Produção:**
1. Acesse: https://dashboard.stripe.com/workbench/webhooks
2. Clique em **Add destination** ou **Create an event destination**
3. Configure:
   - **Events from**: Your account
   - **API version**: Selecione a versão (recomendado: mais recente)
   - **Select events**: 
     - `checkout.session.completed`
     - `invoice.payment_succeeded`
4. Clique em **Continue**
5. Selecione **Webhook endpoint**
6. Clique em **Continue**
7. Preencha:
   - **Endpoint URL**: `https://seu-dominio.com/api/webhooks/stripe`
   - **Description**: Laudok Webhook (opcional)
8. Clique em **Create destination**
9. Copie o **Signing secret** (`whsec_...`) e adicione em `STRIPE_WEBHOOK_SECRET`

### 3. Obter API Keys do Stripe

1. Acesse: https://dashboard.stripe.com/apikeys
2. Copie:
   - **Secret key** (`sk_test_...` ou `sk_live_...`) → `STRIPE_SECRET_KEY`
   - **Publishable key** (`pk_test_...` ou `pk_live_...`) → `STRIPE_PUBLISHABLE_KEY`

## 🧪 Como Testar

### 1. Teste Local

1. Configure as variáveis de ambiente no `.env.local`
2. Inicie o servidor: `npm run dev`
3. Em outro terminal, execute: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
4. Acesse: http://localhost:3000
5. Clique em um plano e teste o checkout

### 2. Cartões de Teste

Use estes cartões para testar:

- **Sucesso**: `4242 4242 4242 4242`
- **Falha**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

**Dados para todos os cartões:**
- Data de expiração: Qualquer data futura (ex: 12/25)
- CVC: Qualquer 3 dígitos (ex: 123)
- CEP: Qualquer CEP válido (ex: 01310-100)

## 📋 Checklist de Configuração

- [ ] Criar arquivo `.env.local` com todas as variáveis
- [ ] Obter API Keys do Stripe Dashboard
- [ ] Configurar webhook (local ou produção)
- [ ] Testar checkout com cartão de teste
- [ ] Verificar se webhook está recebendo eventos
- [ ] Testar integração com API PELIP
- [ ] Configurar URL de produção quando deployar

## 🔗 Links Úteis

- [Stripe Dashboard](https://dashboard.stripe.com/)
- [API Keys](https://dashboard.stripe.com/apikeys)
- [Webhooks](https://dashboard.stripe.com/workbench/webhooks)
- [Products](https://dashboard.stripe.com/products)
- [Documentação Stripe](https://docs.stripe.com/)

## 📝 Notas Importantes

1. **Modo Test vs Live**: 
   - Use `sk_test_` e `pk_test_` para desenvolvimento
   - Use `sk_live_` e `pk_live_` apenas em produção

2. **Webhook Secret**:
   - Em desenvolvimento local: use o secret do `stripe listen`
   - Em produção: use o secret do webhook configurado no Dashboard

3. **Price IDs**: 
   - Os Price IDs já estão configurados como padrão no código
   - Você pode sobrescrever via variáveis de ambiente se necessário

4. **API PELIP**:
   - A chave de teste está documentada em `docs/login.md`
   - Em produção, você precisará da chave real da API

