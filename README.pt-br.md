# Laudok — Site Institucional

**Landing page e integração com Stripe desenvolvida para a Laudok pela [XNAP](https://xnap.com.br)**

🇺🇸 [Read in English](README.md)

🔗 **Site ao vivo:** [laudok.vercel.app](https://laudok.vercel.app)

---

Site institucional da **Laudok**, empresa especializada em laudos automatizados de inspeção predial em conformidade com a ABNT NBR 16.747/2020. O site apresenta o produto, funcionalidades, planos de preço e integra com o Stripe para gestão de assinaturas e acesso à plataforma.

> **Nota:** Este repositório contém apenas o site institucional e a integração de pagamentos. A plataforma de laudos da Laudok é um projeto separado.

## Stack Tecnológica

| Camada    | Tecnologia                          |
|-----------|-------------------------------------|
| Framework | Next.js 15 (App Router, Turbopack) |
| Linguagem | TypeScript (modo strict)            |
| Estilo    | Tailwind CSS 4                      |
| Pagamentos| Stripe (assinaturas & checkout)     |
| Hospedagem| Vercel                              |

## Funcionalidades

- Landing page profissional com hero, vitrine de funcionalidades e planos de preço
- Integração com Stripe para gestão de assinaturas e acesso à plataforma
- Fluxo de login conectando usuários à plataforma Laudok
- Design responsivo (mobile, tablet, desktop)
- SEO otimizado com metadados Open Graph

## Estrutura do Projeto

```
src/
├── app/
│   ├── api/
│   │   ├── auth/login/          # Endpoint de autenticação
│   │   ├── checkout/            # Sessão de checkout do Stripe
│   │   ├── contato/             # Handler do formulário de contato
│   │   └── webhooks/stripe/     # Listener de webhooks do Stripe
│   ├── checkout/
│   │   ├── success/             # Confirmação pós-compra
│   │   └── cancel/              # Cancelamento do checkout
│   ├── contato/                 # Página de contato
│   ├── login/                   # Página de login
│   ├── termos-de-uso/           # Termos de uso
│   ├── politica-de-privacidade/ # Política de privacidade
│   ├── layout.tsx               # Layout raiz
│   └── page.tsx                 # Home / landing page
├── components/
│   ├── home/                    # Seções da landing page
│   ├── contato/                 # Componentes da página de contato
│   ├── login/                   # Componentes de login
│   └── layout/                  # Header, Footer
└── lib/
    ├── stripe.ts                # Inicialização do cliente Stripe
    └── pelip-api.ts             # Integração com API externa
```

## Primeiros Passos

```bash
# Clone o repositório
git clone https://github.com/adrianoals/laudok.git
cd laudok

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas chaves do Stripe (veja a seção abaixo)

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## Variáveis de Ambiente

Copie o `.env.example` para `.env.local` e preencha os valores necessários:

| Variável                       | Descrição                               |
|--------------------------------|-----------------------------------------|
| `STRIPE_SECRET_KEY`            | Chave secreta do Stripe                 |
| `STRIPE_PUBLISHABLE_KEY`       | Chave pública do Stripe                 |
| `STRIPE_WEBHOOK_SECRET`        | Secret de assinatura do webhook Stripe  |
| `STRIPE_PRICE_ID_BASICO`       | ID do preço para o plano Básico         |
| `STRIPE_PRICE_ID_PROFISSIONAL` | ID do preço para o plano Profissional   |
| `NEXT_PUBLIC_APP_URL`          | URL base da aplicação                   |

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
