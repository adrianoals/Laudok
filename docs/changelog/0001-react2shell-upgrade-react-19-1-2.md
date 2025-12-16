# Upgrade React/ReactDOM para correção React2Shell (CVE-2025-55182)

## Título
Upgrade de `react`/`react-dom` para versões corrigidas do bulletin React2Shell.

## Arquivos modificados
- `package.json`
- `package-lock.json`

## Descrição detalhada
- Atualizado `react` e `react-dom` para **19.1.2** (versões corrigidas recomendadas no contexto do React2Shell / React Server Components).
- Mantido `next` em **15.3.8** (já acima do mínimo “patched release” indicado para 15.3.x no bulletin da Vercel).

## Passo a passo do que foi feito
1. Conferida a versão instalada de `next`, `react` e `react-dom`.
2. Atualizado `react` e `react-dom` para `19.1.2` via npm.
3. Rodado `npm run lint` e `npm run build` para validar.

## Critérios de aceitação
- `npm ls next react react-dom --depth=0` mostra `next@15.3.8`, `react@19.1.2`, `react-dom@19.1.2`.
- `npm run lint` passa sem erros.
- `npm run build` conclui com sucesso.

## Status final
Implementado.
