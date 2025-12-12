# Como Testar Webhook Stripe na Vercel

Este guia explica como testar o webhook do Stripe quando seu projeto está hospedado na Vercel (produção ou preview).

## 📋 Pré-requisitos

1. Projeto deployado na Vercel
2. Conta Stripe (modo teste)
3. Acesso ao Stripe Dashboard
4. Acesso ao Vercel Dashboard

## 🚀 Opção 1: Testar na Produção (URL Principal)

### Passo 1: Obter a URL do Projeto na Vercel

1. Acesse o [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **Domains**
4. Copie a URL do projeto (ex: `https://laudok.vercel.app` ou seu domínio customizado)

### Passo 2: Configurar Webhook no Stripe Dashboard

1. Acesse o [Stripe Dashboard](https://dashboard.stripe.com/)
2. Certifique-se de estar no **modo teste** (toggle no topo)
3. Vá em **Developers** → **Webhooks**
4. Clique em **Add endpoint**
5. Preencha:
   - **Endpoint URL**: `https://seu-projeto.vercel.app/api/webhooks/stripe`
     - Exemplo: `https://laudok.vercel.app/api/webhooks/stripe`
   - **Description**: `Laudok Webhook - Vercel Production` (opcional)
6. Clique em **Add endpoint**

### Passo 3: Selecionar Eventos

Na tela de configuração do webhook:

1. Clique em **Select events**
2. Selecione os eventos necessários:
   - ✅ `checkout.session.completed`
   - ✅ `invoice.payment_succeeded`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
3. Clique em **Add events**

### Passo 4: Obter o Webhook Secret

1. Na página do webhook criado, clique em **Reveal** no campo **Signing secret**
2. Copie o valor `whsec_...`
3. **IMPORTANTE**: Este secret é diferente do usado localmente!

### Passo 5: Configurar Variáveis de Ambiente na Vercel

1. No Vercel Dashboard, vá em **Settings** → **Environment Variables**
2. Adicione/atualize as variáveis:

```env
STRIPE_SECRET_KEY=sk_test_... (sua chave de teste)
STRIPE_WEBHOOK_SECRET=whsec_... (o secret do webhook da Vercel)
STRIPE_PUBLISHABLE_KEY=pk_test_... (sua chave pública)
NEXT_PUBLIC_APP_URL=https://seu-projeto.vercel.app
```

3. Certifique-se de que as variáveis estão configuradas para:
   - ✅ **Production**
   - ✅ **Preview** (se quiser testar em preview deployments)
   - ✅ **Development** (opcional)

4. Clique em **Save**

### Passo 6: Fazer Redeploy (se necessário)

Se você adicionou novas variáveis de ambiente:

1. Vá em **Deployments**
2. Clique nos **3 pontos** do último deployment
3. Selecione **Redeploy**
4. Aguarde o deploy completar

### Passo 7: Testar o Webhook

#### A) Testar com Checkout Real

1. Acesse sua URL na Vercel: `https://seu-projeto.vercel.app`
2. Clique em um plano
3. Complete o checkout com cartão de teste:
   - **Cartão**: `4242 4242 4242 4242`
   - **Data**: Qualquer data futura
   - **CVC**: Qualquer 3 dígitos
   - **CEP**: Qualquer CEP válido
4. Complete o pagamento

#### B) Verificar se o Webhook Foi Recebido

**No Stripe Dashboard:**
1. Vá em **Developers** → **Webhooks**
2. Clique no webhook criado
3. Vá na aba **Events**
4. Você verá os eventos recebidos e o status (sucesso ✅ ou erro ❌)

**Na Vercel:**
1. Vá em **Deployments**
2. Clique no deployment mais recente
3. Vá na aba **Functions**
4. Procure por `/api/webhooks/stripe`
5. Clique para ver os logs

**Ou via Vercel CLI:**
```bash
# Instalar Vercel CLI (se não tiver)
npm i -g vercel

# Fazer login
vercel login

# Ver logs em tempo real
vercel logs --follow
```

#### C) Testar Eventos Específicos (Sem Checkout)

Você pode disparar eventos de teste diretamente no Stripe Dashboard:

1. No webhook criado, clique em **Send test webhook**
2. Selecione o evento (ex: `checkout.session.completed`)
3. Clique em **Send test webhook**
4. Verifique os logs na Vercel

## 🔄 Opção 2: Testar em Preview Deployment

Preview deployments são úteis para testar antes de ir para produção.

### Passo 1: Criar Webhook para Preview

1. No Stripe Dashboard, crie um **novo endpoint**:
   - **Endpoint URL**: `https://seu-projeto-git-branch.vercel.app/api/webhooks/stripe`
   - **Description**: `Laudok Webhook - Preview`
2. Copie o **Signing secret** deste webhook

### Passo 2: Configurar Variáveis de Preview

1. No Vercel Dashboard, vá em **Settings** → **Environment Variables**
2. Adicione `STRIPE_WEBHOOK_SECRET` com o secret do preview
3. Marque apenas **Preview** ✅
4. Salve

### Passo 3: Testar

1. Faça um push para uma branch (ex: `git push origin feature/test`)
2. A Vercel criará automaticamente um preview deployment
3. Use a URL do preview para testar
4. Configure o webhook no Stripe para apontar para essa URL específica

**Nota**: URLs de preview mudam a cada deploy. Você pode:
- Usar um webhook temporário para cada teste
- Ou usar o Stripe CLI para fazer forward (veja Opção 3)

## 🛠️ Opção 3: Usar Stripe CLI com Vercel (Híbrido)

Você pode usar o Stripe CLI para fazer forward dos webhooks para a Vercel:

```bash
# Fazer forward para produção
stripe listen --forward-to https://seu-projeto.vercel.app/api/webhooks/stripe

# Fazer forward para preview
stripe listen --forward-to https://seu-projeto-git-branch.vercel.app/api/webhooks/stripe
```

**Vantagens:**
- Ver eventos em tempo real no terminal
- Não precisa configurar webhook no Stripe Dashboard
- Útil para testes rápidos

**Desvantagens:**
- Precisa manter o terminal aberto
- Não funciona se sua máquina estiver offline

## 📊 Verificar Logs e Debugging

### Na Vercel Dashboard

1. **Deployments** → Clique no deployment → **Functions** → `/api/webhooks/stripe`
2. Você verá:
   - Status das requisições (200, 400, 500)
   - Tempo de execução
   - Logs de console.log()

### Via Vercel CLI

```bash
# Ver logs em tempo real
vercel logs --follow

# Ver logs de uma função específica
vercel logs --follow --function /api/webhooks/stripe
```

### No Stripe Dashboard

1. **Developers** → **Webhooks** → Seu webhook → **Events**
2. Veja:
   - Eventos recebidos
   - Status da resposta (200 = sucesso)
   - Payload completo
   - Tentativas de retry (se houver erro)

## ✅ Checklist de Teste

- [ ] Webhook configurado no Stripe Dashboard
- [ ] URL do webhook aponta para a Vercel
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] `STRIPE_WEBHOOK_SECRET` está correto (diferente do local!)
- [ ] Projeto redeployado após adicionar variáveis
- [ ] Teste de checkout realizado
- [ ] Eventos aparecem no Stripe Dashboard
- [ ] Logs aparecem na Vercel
- [ ] Webhook retorna status 200

## 🐛 Problemas Comuns

### Problema: Webhook retorna 400/500

**Soluções:**
1. Verifique se `STRIPE_WEBHOOK_SECRET` está correto na Vercel
2. Verifique os logs na Vercel para ver o erro específico
3. Certifique-se de que o webhook está no modo correto (test/live)

### Problema: Não recebe eventos

**Soluções:**
1. Verifique se a URL do webhook está correta
2. Verifique se o webhook está ativo no Stripe Dashboard
3. Teste enviando um evento manualmente: **Send test webhook**
4. Verifique se está no modo correto (test/live)

### Problema: Webhook secret diferente

**Soluções:**
- Cada webhook endpoint tem seu próprio secret
- O secret local (`stripe listen`) é diferente do da Vercel
- Use o secret correto para cada ambiente

### Problema: Preview deployment não recebe webhooks

**Soluções:**
1. URLs de preview mudam a cada deploy
2. Crie um webhook temporário para cada preview
3. Ou use Stripe CLI para fazer forward

## 🔐 Segurança

### ✅ Boas Práticas

1. **Use HTTPS sempre**
   - Vercel já fornece HTTPS automaticamente
   - Stripe só envia webhooks para URLs HTTPS

2. **Mantenha secrets seguros**
   - Nunca commite `STRIPE_WEBHOOK_SECRET` no código
   - Use variáveis de ambiente na Vercel
   - Rotacione secrets periodicamente

3. **Valide assinaturas**
   - Seu código já faz isso com `stripe.webhooks.constructEvent()`
   - Nunca desabilite a validação

4. **Monitore webhooks**
   - Configure alertas no Stripe para falhas
   - Monitore logs na Vercel
   - Implemente retry logic (Stripe já faz isso automaticamente)

## 📝 Resumo

### Para Produção:
1. Criar webhook no Stripe → URL da Vercel
2. Copiar webhook secret
3. Adicionar `STRIPE_WEBHOOK_SECRET` na Vercel
4. Redeployar
5. Testar checkout

### Para Preview:
1. Criar webhook separado → URL do preview
2. Usar secret diferente
3. Configurar apenas para Preview
4. Testar

### Para Debug:
1. Ver logs na Vercel Dashboard
2. Ver eventos no Stripe Dashboard
3. Usar `vercel logs --follow` para tempo real

## 🎯 Próximos Passos

Após testar e confirmar que está funcionando:
1. Configurar webhook para produção (modo live)
2. Implementar salvamento no banco de dados
3. Adicionar monitoramento e alertas
4. Documentar processo de troubleshooting

