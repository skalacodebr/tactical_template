# Guia de Organização: Frontend e Backend em Projetos Next.js

## Estrutura Recomendada

```
├── app/                # Frontend (páginas, componentes visuais, hooks)
├── backend/            # Backend (integrações, lógica de autenticação, serviços)
├── components/         # Componentes reutilizáveis de UI
├── hooks/              # Hooks customizados
├── lib/                # Utilitários e helpers genéricos
├── public/             # Arquivos estáticos
├── styles/             # Estilos globais
├── .env.local          # Variáveis de ambiente (NUNCA subir para o git)
```

## Separação de Responsabilidades

### Frontend (`app/`)
- **Responsável por:**
  - Páginas e rotas (ex: `/login`, `/register`, `/dashboard`)
  - Componentes de interface e experiência do usuário
  - Hooks de estado e lógica de UI
  - Consumo de funções do backend para autenticação, dados, etc.

### Backend (`backend/`)
- **Responsável por:**
  - Integração com serviços externos (ex: Firebase, APIs)
  - Funções de autenticação, registro, logout, etc.
  - Lógica de negócio que não pertence à UI
  - Pode conter subpastas para diferentes domínios (ex: `backend/auth/`, `backend/db/`)

## Boas Práticas

- **Nunca coloque segredos diretamente no código.** Use variáveis de ambiente e acesse via `process.env`.
- **Importe funções do backend apenas onde necessário.**
- **Evite lógica de autenticação diretamente nas páginas.** Centralize no backend.
- **Prossiga com componentes puros no frontend.** Deixe o backend cuidar de integrações e regras de negócio.
- **Documente a estrutura do projeto.**

## Exemplo de Fluxo

1. Usuário preenche formulário de login em `app/login/page.tsx`.
2. O frontend chama `loginWithEmail` do `backend/auth.ts`.
3. O backend executa a autenticação com Firebase e retorna o resultado.
4. O frontend trata o resultado e navega conforme necessário.

## Vantagens dessa Separação
- **Organização:** Código limpo e fácil de manter.
- **Escalabilidade:** Fácil adicionar novas integrações e funcionalidades.
- **Reutilização:** Funções do backend podem ser usadas em diferentes partes do frontend.

## Sobre esta Codebase

Este projeto utiliza Next.js com autenticação e registro via Firebase, organizado para máxima clareza e escalabilidade. Veja como cada parte se conecta:

### Principais Pastas e Arquivos

- **app/**
  - Contém todas as páginas do frontend, como `/login`, `/register` e `/dashboard`.
  - Cada página é responsável apenas pela interface e por chamar funções do backend para autenticação e registro.

- **backend/**
  - Centraliza toda a lógica de integração com o Firebase.
  - `firebase.ts`: configuração do Firebase usando variáveis de ambiente.
  - `auth.ts`: funções para registrar, logar e deslogar usuários.

- **components/**
  - Componentes reutilizáveis de UI, como botões, inputs, cards, etc.

- **hooks/**
  - Hooks customizados para lógica de frontend.

- **lib/**
  - Utilitários e helpers genéricos, que podem ser usados tanto no frontend quanto no backend.

- **public/**
  - Arquivos estáticos (imagens, favicon, etc).

- **styles/**
  - Estilos globais do projeto.

- **.env.local**
  - Variáveis de ambiente sensíveis, como as chaves do Firebase. Nunca suba este arquivo para o git.

### Fluxo de Autenticação e Registro

1. Usuário acessa `/register` ou `/login` e preenche o formulário.
2. O frontend chama as funções do backend (`registerWithEmail` ou `loginWithEmail`).
3. O backend executa a lógica de autenticação/registro usando o Firebase.
4. O frontend trata o resultado e redireciona o usuário conforme necessário.
5. O acesso ao `/dashboard` é protegido: só usuários autenticados conseguem acessar.

### Observações
- O código está pronto para ser expandido: basta adicionar novas funções no backend e consumir no frontend.
- Para logout, basta chamar a função `logout` do backend.
- Para proteger outras rotas, basta usar o padrão já implementado no dashboard.

---

> **Dica:** Sempre mantenha a pasta `backend/` para tudo que for integração, lógica de negócio e serviços. O restante, deixe no frontend! 