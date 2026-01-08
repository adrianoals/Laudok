# Aumenta margem superior do card de login

## Título
Ajuste do espaçamento superior da página de login para posicionar o card mais abaixo do header.

## Arquivos modificados
- `src/app/login/page.tsx`

## Descrição detalhada
- Aumentado o espaçamento superior do container principal da rota `/login` ajustando o `padding-top` (Tailwind) de `pt-20` para `pt-24 sm:pt-28`.
- O objetivo é criar **mais “margem” visual no topo** (mais espaço acima do formulário), mantendo o header fixo sem sobreposição.

## Passo a passo das ações realizadas
1. Identificado o container do conteúdo do login em `src/app/login/page.tsx` (elemento `<main>`).
2. Ajustadas as classes Tailwind para aumentar o espaçamento superior de forma responsiva.
3. Validado que a alteração afeta apenas a rota `/login`.

## Critérios de aceitação
- Ao abrir `/login`, o card do `LoginForm` aparece **mais abaixo**, com mais espaço acima em relação ao header.
- Não há regressão visual em outras páginas.

## Status final
Implementado.

