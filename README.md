# TaskMaster

TaskMaster é uma aplicação fullstack para gerenciamento de tarefas, construída com **Ruby on Rails API** no backend e **React + TypeScript + Vite** no frontend. O projeto utiliza autenticação JWT, paginação, testes automatizados, arquitetura moderna e segue boas práticas de desenvolvimento.

---

## Sumário

- Funcionalidades
- Stack e Principais Dependências
- Como rodar o projeto
- Ambiente de desenvolvimento
- Testes
- Padrões de código e arquitetura
- APIs e Endpoints
- Internacionalização
- Licença

---

## Funcionalidades

- Cadastro e login de usuários com autenticação JWT (Devise + devise-jwt)
- Recuperação de senha ("esqueci minha senha") via e-mail
- CRUD de tarefas (tasks) com título, descrição, data de entrega e status
- Busca e filtro de tarefas por título e status
- Paginação de tarefas
- Interface responsiva e acessível
- Toasts e loaders globais para feedback ao usuário
- Testes automatizados (RSpec, FactoryBot)
- Separação clara entre frontend e backend

---

## Stack e Principais Dependências

### Backend (Rails API)

- Ruby on Rails 8 (API only)
- PostgreSQL
- Devise & devise-jwt (autenticação)
- Kaminari (paginação)
- ActiveModelSerializers (serialização de JSON)
- RSpec, FactoryBot, Shoulda Matchers (testes)
- dotenv-rails (variáveis de ambiente)
- rack-cors (CORS)
- Mailcatcher ou Letter Opener (para testes de e-mail em desenvolvimento)

### Frontend (React)

- React 19 + TypeScript
- Vite
- React Hook Form + Zod (validação de formulários)
- Axios (requisições HTTP)
- @tanstack/react-query (cache e gerenciamento de dados)
- Zustand (estado global)
- TailwindCSS (estilização)
- React Hot Toast (notificações)
- React Router v7 (roteamento)

---

## Como rodar o projeto

### Pré-requisitos

- Docker e Docker Compose (recomendado)
- Node.js 18+
- Yarn ou npm
- Ruby 3.3+ e bundler (caso rode localmente o backend)
- PostgreSQL (caso rode localmente o backend)

### Usando Docker Compose

```sh
docker-compose up --build
```

Acesse:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Rodando manualmente

#### Backend

```sh
cd api
bundle install
cp .env.development .env # configure suas variáveis
rails db:create db:migrate db:seed
rails s
```

#### Frontend

```sh
cd web
npm install
npm run dev
```

---

## Ambiente de desenvolvimento

- Variáveis de ambiente estão em [`.env`](.env), `.env.development`, `.env.test` (backend) e [`.env`](.env) (frontend, se necessário).
- O backend usa CORS configurado para aceitar requisições do frontend.
- O JWT é enviado via cookie httpOnly para máxima segurança.
- Para testar e-mails em desenvolvimento, utilize [Mailcatcher](https://mailcatcher.me/) ou [Letter Opener](https://github.com/ryanb/letter_opener).

---

## Testes

### Backend

```sh
cd api
bundle exec rspec
```

- Testes de model, request e integração usando RSpec, FactoryBot e Shoulda Matchers.

## Padrões de código e arquitetura

- **Backend:**

  - Controllers finos, lógica de negócio em models/services
  - Serializers para padronizar respostas JSON
  - Paginação e busca eficientes
  - Testes automatizados

- **Frontend:**

  - Hooks customizados para queries/mutations (React Query)
  - Estado global mínimo (Zustand)
  - Componentes reutilizáveis e acessíveis
  - Validação de dados com Zod
  - Toasts e loaders globais

---

## APIs e Endpoints

### Usuários

- `POST /users` — Criação de conta
- `POST /users/sign_in` — Login
- `DELETE /users/sign_out` — Logout
- `POST /users/password` — Esqueci minha senha (envio de e-mail)
- `PUT /users/password` — Redefinir senha

### Tasks

- `GET /tasks` — Listar tarefas (paginação: `?page=1&per_page=10`)
- `POST /tasks` — Criar tarefa
- `PATCH /tasks/:id` — Atualizar tarefa
- `DELETE /tasks/:id` — Remover tarefa
- `GET /tasks/search_by_title?title=...` — Buscar por título

---

## Internacionalização

- Mensagens de erro e feedback traduzidas no frontend.

---

## Licença

Este projeto está sob a licença MIT.

---

**Dúvidas ou sugestões? Abra uma issue ou pull request!**
