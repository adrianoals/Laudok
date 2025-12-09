# Integração com Stripe - Documentação

## Variáveis de Ambiente Necessárias

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Stripe Price IDs (já criados no Stripe)
STRIPE_PRICE_ID_BASICO=price_1ScaeDP1IAVAPkrfWK70N4K0
STRIPE_PRICE_ID_PROFISSIONAL=price_1ScaeEP1IAVAPkrf0q3eBJau
STRIPE_PRICE_ID_ENTERPRISE=price_... # (opcional, Enterprise é sob consulta)

# PELIP API Configuration
PELIP_API_KEY=keyTesteParaTestarAcessoAAPIDeOutroAPP

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Configuração do Stripe

### 1. Criar Produtos e Preços no Stripe Dashboard

1. Acesse o [Stripe Dashboard](https://dashboard.stripe.com/)
2. Vá em **Products** → **Add Product**
3. Crie 3 produtos:
   - **Básico**: R$ 299,00/mês (recorrente)
   - **Profissional**: R$ 599,00/mês (recorrente)
   - **Enterprise**: (opcional, pois é sob consulta)

4. Copie os **Price IDs** e adicione nas variáveis de ambiente:
   - `STRIPE_PRICE_ID_BASICO`
   - `STRIPE_PRICE_ID_PROFISSIONAL`
   - `STRIPE_PRICE_ID_ENTERPRISE` (se aplicável)

### 2. Configurar Webhook

1. No Stripe Dashboard, vá em **Developers** → **Webhooks**
2. Clique em **Add endpoint**
3. URL do endpoint: `https://seu-dominio.com/api/webhooks/stripe`
4. Selecione os eventos:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
5. Copie o **Signing secret** e adicione em `STRIPE_WEBHOOK_SECRET`

### 3. Para Desenvolvimento Local

Use o Stripe CLI para testar webhooks localmente:

```bash
# Instalar Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks para localhost
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

O comando acima retornará um `whsec_...` que você deve usar como `STRIPE_WEBHOOK_SECRET` em desenvolvimento.

## Fluxo de Integração

### 1. Seleção de Plano
- Usuário clica em um plano na página inicial
- Redireciona para `/checkout?plan=basico` ou `/checkout?plan=profissional`

### 2. Página de Checkout
- Usuário preenche email e nome de usuário
- Ao submeter, cria uma sessão de checkout no Stripe
- Redireciona para o Stripe Checkout

### 3. Pagamento Bem-sucedido
- Stripe redireciona para `/checkout/success?session_id=...`
- Webhook é acionado com evento `checkout.session.completed`

### 4. Webhook Processa Pagamento
- Verifica se a assinatura está ativa
- Chama a API PELIP para criar o usuário pré-cadastrado
- Retorna sucesso

### 5. API PELIP
- Endpoint: `https://laudok.com.br/PELIP_API/CreateUser`
- Header: `CreateUser-Key: {PELIP_API_KEY}`
- Body: `{ Email: string, UserName: string }`
- Response: `{ Success: true, UserId: string, Email: string, UserName: string, CallbackUrl: string }`

## Estrutura de Arquivos Criados

```
src/
├── lib/
│   ├── stripe.ts              # Configuração do Stripe
│   └── pelip-api.ts            # Cliente da API PELIP
├── app/
│   ├── api/
│   │   ├── checkout/
│   │   │   └── route.ts        # API para criar checkout session
│   │   └── webhooks/
│   │       └── stripe/
│   │           └── route.ts     # Webhook handler do Stripe
│   └── checkout/
│       ├── page.tsx            # Página de checkout (formulário)
│       ├── success/
│       │   └── page.tsx        # Página de sucesso
│       └── cancel/
│           └── page.tsx        # Página de cancelamento
```

## Testando a Integração

### Cartão de Teste do Stripe

Use os seguintes cartões para testar:

- **Sucesso**: `4242 4242 4242 4242`
- **Falha**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

Data de expiração: qualquer data futura
CVC: qualquer 3 dígitos
CEP: qualquer CEP válido

### Testando Webhook Localmente

1. Inicie o servidor: `npm run dev`
2. Em outro terminal, execute: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
3. Complete um pagamento de teste
4. Verifique os logs do webhook

## Próximos Passos

- [ ] Adicionar tratamento de erros mais robusto
- [ ] Salvar informações do usuário no banco de dados
- [ ] Enviar email de boas-vindas após cadastro
- [ ] Implementar página de gerenciamento de assinatura
- [ ] Adicionar logs de auditoria


