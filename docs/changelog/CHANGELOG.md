# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Adicionado
- Página de contato (`/contato`) com formulário de solicitação
- Componentes de contato: `ContactForm`, `ContactInfo`, `WhatsAppButton`
- API route `/api/contato` para processar mensagens de contato
- Integração completa com Stripe para pagamentos
- API route `/api/checkout` para criar sessões de checkout
- API route `/api/webhooks/stripe` para processar webhooks do Stripe
- Integração com API PELIP para pré-cadastro de usuários após pagamento
- Páginas de sucesso e cancelamento do checkout (`/checkout/success`, `/checkout/cancel`)
- Biblioteca `stripe` e `@stripe/stripe-js` para integração de pagamentos
- Biblioteca `pelip-api` para comunicação com API de pré-cadastro
- Produtos e preços criados no Stripe (Plano Básico e Profissional)
- Documentação de integração Stripe (`docs/stripe-integration.md`)
- Guia de configuração Stripe (`docs/stripe-setup-status.md`)
- Arquivo `.env.example` com variáveis de ambiente necessárias

### Modificado
- Reorganizada estrutura de componentes: `src/components/home/sections/` → `src/components/home/`
- Simplificado fluxo de checkout: removida página intermediária, redirecionamento direto para Stripe Checkout
- Atualizado `PlansSection` para chamar API de checkout diretamente
- Atualizado webhook do Stripe para usar nome do customer como userName na API PELIP
- Atualizado `.gitignore` para permitir versionamento de `.env.example`

### Removido
- Página `/checkout` intermediária (substituída por redirecionamento direto)
- Pasta `src/components/home/sections/` (componentes movidos para `src/components/home/`)

## [0.1.0] - 2024-12-12

### Adicionado
- Estrutura inicial do projeto Next.js 15.3.1
- Página inicial com seções: Hero, About, Features, Problem/Solution, How It Works, Plans, Testimonials, CTA, FAQ
- Componentes de layout: Header e Footer
- Páginas legais: Política de Privacidade e Termos de Uso
- Sistema de design com Tailwind CSS 4
- Paleta de cores Laudok (azul #0086C2, #034575, #e6f4fa)
- Documentação de contexto do projeto (`docs/context.md`)
- Configuração de TypeScript
- Configuração de ESLint

---

## Tipos de Mudanças

- **Adicionado** para novas funcionalidades
- **Modificado** para mudanças em funcionalidades existentes
- **Descontinuado** para funcionalidades que serão removidas
- **Removido** para funcionalidades removidas
- **Corrigido** para correção de bugs
- **Segurança** para vulnerabilidades

