# Laudok — Institutional Website

**Landing page and Stripe integration built for Laudok by [XNAP](https://xnap.com.br)**

🇧🇷 [Leia em Português](README.pt-br.md)

🔗 **Live site:** [laudok.vercel.app](https://laudok.vercel.app)

---

Institutional website for **Laudok**, a company specializing in automated building inspection reports compliant with ABNT NBR 16.747/2020. The site showcases the product, features, pricing plans, and integrates with Stripe for subscription management and platform access.

> **Note:** This repository contains only the institutional website and payment integration. The Laudok inspection platform itself is a separate project.

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language  | TypeScript (strict mode)            |
| Styling   | Tailwind CSS 4                      |
| Payments  | Stripe (subscriptions & checkout)   |
| Hosting   | Vercel                              |

## Features

- Professional landing page with hero, features showcase, and pricing plans
- Stripe integration for subscription management and platform access
- Login flow connecting users to the Laudok platform
- Responsive design (mobile, tablet, desktop)
- SEO optimized with Open Graph metadata

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/login/          # Authentication endpoint
│   │   ├── checkout/            # Stripe checkout session
│   │   ├── contato/             # Contact form handler
│   │   └── webhooks/stripe/     # Stripe webhook listener
│   ├── checkout/
│   │   ├── success/             # Post-purchase confirmation
│   │   └── cancel/              # Checkout cancellation
│   ├── contato/                 # Contact page
│   ├── login/                   # Login page
│   ├── termos-de-uso/           # Terms of use
│   ├── politica-de-privacidade/ # Privacy policy
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home / landing page
├── components/
│   ├── home/                    # Landing page sections
│   ├── contato/                 # Contact page components
│   ├── login/                   # Login components
│   └── layout/                  # Header, Footer
└── lib/
    ├── stripe.ts                # Stripe client initialization
    └── pelip-api.ts             # External API integration
```

## Getting Started

```bash
# Clone the repository
git clone https://github.com/adrianoals/laudok.git
cd laudok

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Stripe keys (see section below)

# Start the development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values:

| Variable                       | Description                        |
|--------------------------------|------------------------------------|
| `STRIPE_SECRET_KEY`            | Stripe secret key                  |
| `STRIPE_PUBLISHABLE_KEY`       | Stripe publishable key             |
| `STRIPE_WEBHOOK_SECRET`        | Stripe webhook signing secret      |
| `STRIPE_PRICE_ID_BASICO`       | Price ID for the Basic plan        |
| `STRIPE_PRICE_ID_PROFISSIONAL` | Price ID for the Professional plan |
| `NEXT_PUBLIC_APP_URL`          | Application base URL               |

## License

This project is licensed under the [MIT License](LICENSE).
