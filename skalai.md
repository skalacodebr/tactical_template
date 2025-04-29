

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



# Guia de Organização de Projeto Next.js com Firebase (Authentication e Firestore)

## Introdução
Este guia fornece diretrizes para organizar e padronizar o código de um projeto **Next.js** integrado com **Firebase Authentication** (autenticação de usuários) e **Cloud Firestore** (banco de dados NoSQL). Serão abordadas a estrutura recomendada de pastas, boas práticas de nomenclatura e formatação, orientações para implementar operações **CRUD** no Firestore, tratamento de erros e fluxo de autenticação. O objetivo é manter o código claro, escalável e de fácil manutenção, seguindo uma linguagem objetiva e profissional.

## Estrutura do Projeto
Organize o projeto separando as responsabilidades de **front‑end** (interface do usuário) e **back‑end** (lógica de servidor). A seguir, uma estrutura de pastas sugerida:

| Pasta/Arquivo | Descrição |
|---------------|-----------|
| **pages/** | Páginas da aplicação (frontend). Cada arquivo/subpasta define uma rota. Ex.: `pages/index.js`, `pages/dashboard.js`. |
| **pages/api/** | Rotas de API (backend) executadas no servidor. Coloque aqui lógica segura ou uso do Admin SDK do Firebase. |
| **components/** | Componentes **React** reutilizáveis de UI. |
| **styles/** | Estilos globais ou módulos CSS. |
| **lib/** ou **services/** | Configuração do Firebase (`lib/firebase.js`) e funções utilitárias (CRUD Firestore, chamadas externas). |
| **context/** *(opcional)* | Contextos React para estado global (ex.: `AuthContext`). |
| **public/** | Arquivos estáticos públicos (imagens, fontes). |
| **pages/_app.js** | Componente raiz do Next.js – engloba a app com provedores e importa estilos globais. |
| **pages/_document.js** | Documento HTML customizado do Next.js. |
| **.env.local** | Variáveis de ambiente (não versionado). |

> **Observação:** Se usar o App Router (`app/`) no Next.js 13+, adapte a lógica, mas as diretrizes gerais permanecem.

## Padrões e Boas Práticas
- **Nomenclatura:** `camelCase` para variáveis/funções, `PascalCase` para componentes, `SNAKE_CASE` para constantes/variáveis de ambiente.
- **Organização:** arquivos pequenos e com responsabilidade única. Separe lógica e UI.
- **Reutilização:** crie componentes, hooks e utilitários reaproveitáveis.
- **Formatação:** use Prettier + ESLint. Configure regras de projeto e formate antes de commitar.
- **Comentários:** explique *por que*, não *o que*. Documente partes complexas em Markdown.
- **Segurança:** nunca exponha segredos. Use `.env.local` e regras do Firestore.

## CRUD com Firestore

```javascript
// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### Criar
```javascript
import { collection, addDoc } from 'firebase/firestore';
async function criarUsuario(dados) {
  try {
    const ref = await addDoc(collection(db, 'usuarios'), {
      ...dados,
      criadoEm: Date.now(),
    });
    return ref.id;
  } catch (e) {
    console.error('Erro ao criar:', e);
    throw e;
  }
}
```

### Ler
```javascript
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
async function lerUsuario(id) {
  const snap = await getDoc(doc(db, 'usuarios', id));
  return snap.exists() ? snap.data() : null;
}
async function listarUsuarios() {
  const qSnap = await getDocs(collection(db, 'usuarios'));
  return qSnap.docs.map(d => ({ id: d.id, ...d.data() }));
}
```

### Atualizar
```javascript
import { doc, updateDoc } from 'firebase/firestore';
async function atualizarUsuario(id, dados) {
  await updateDoc(doc(db, 'usuarios', id), dados);
}
```

### Excluir
```javascript
import { doc, deleteDoc } from 'firebase/firestore';
async function excluirUsuario(id) {
  await deleteDoc(doc(db, 'usuarios', id));
}
```

> **Segurança:** defina regras do Firestore permitindo acesso apenas ao `request.auth.uid` correspondente.

## Controle de Erros
- Envolva chamadas assíncronas em `try/catch`.
- Exiba mensagens amigáveis; não mostre detalhes técnicos ao usuário.
- Logue erros em dev; use Sentry ou similar em prod.
- Valide dados antes de enviar ao Firestore.
- Use *Error Boundaries* ou contexto para capturar exceções globais.

## Fluxo de Autenticação
1. **AuthProvider:** wrapper em `_app.js` usando `onAuthStateChanged` para prover `{user, loading}`.
2. **Login/Logout:** funções encapsuladas que chamam `signInWithEmailAndPassword` e `signOut`.
3. **Proteção de Rotas:** HOC `withAuth` ou redirecionamento via `router.push('/login')` quando `!user`.
4. **Perfil:** após `signUp`, crie documento em `usuarios/{uid}` contendo dados adicionais.
5. **Regras:** utilize `uid` nas regras do Firestore para autorização.

## Observações Finais
Seguindo estas diretrizes você terá um código limpo, organizado e escalável. Adapte conforme o crescimento do projeto e mantenha-se atualizado com as documentações oficiais do **Next.js** e **Firebase**.




