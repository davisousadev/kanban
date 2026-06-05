
# Kanban

Um aplicativo Kanban simples composto por um backend em Node.js/TypeScript e um frontend em Vue 3 + Vite.

## Visão geral

Este repositório contém uma aplicação de gerenciamento de tarefas em estilo Kanban, dividida em duas partes principais:

- `backend/`: API REST escrita em TypeScript usando Node.js; persiste dados via migrations Drizzle/SQL e expõe rotas para manipulação de quadros e cartões.
- `client/`: aplicação frontend construída com Vue 3, Vite e composição de componentes para exibir e editar cartões Kanban.

O objetivo é oferecer uma base simples e extensível para experimentar fluxos de trabalho Kanban, integrações e aprendizado de stacks modernos (TypeScript, Drizzle, Vite, Vue).

## Arquitetura

- Frontend: Vue 3 + Vite, componentes reutilizáveis em `client/src/components` e store simples em `client/src/stores`.
- Backend: Node.js + TypeScript, servidor em `backend/src/server.ts` e rotas em `backend/src/routes`.
- Banco de dados: migrations SQL em `backend/drizzle` (ex.: `0000_*.sql`, `0001_*.sql`) gerenciadas com Drizzle.

## Tecnologias

- TypeScript
- Node.js
- Drizzle (migrations / schema)
- SQLite/Postgres (dependendo da configuração em produção)
- Vue 3 + Vite

## Estrutura do projeto (resumo)

- `backend/`
	- `src/` — código do servidor e rotas
	- `drizzle/` — migrations e snapshots
	- `docker-compose.yaml` — infraestrutura opcional para desenvolvimento
- `client/`
	- `src/` — código do frontend (App.vue, componentes, stores, types)
	- `vite.config.ts`, `package.json` — configuração do build

## Como rodar localmente

Pré-requisitos: Node.js (16+), yarn (ou npm), Docker (opcional).

- Backend (modo rápido):

```bash
cd backend
yarn install
yarn dev
```

- Frontend:

```bash
cd client
npm install
npm run dev
```

- Usando Docker Compose (se preferir isolar infra):

```bash
cd backend
docker compose up --build
```

## Banco de dados e migrations

As migrations SQL estão em `backend/drizzle`. Para aplicar migrations siga a ferramenta/configuração de Drizzle definida no projeto (ver `drizzle.config.ts`).

## Endpoints principais

- As rotas da API encontram-se em `backend/src/routes` (ex.: `kanban.ts`) e expõem operações CRUD para quadros e cartões.

## Frontend

- A UI está em `client/src/components`. Componentes importantes:
	- `KabanBoard.vue` — visualização do quadro
	- `KanbanCard.vue` — cartão individual
	- `Modal.vue` — diálogo de criação/edição

## Testes

Se não houver suíte de testes configurada, adicione testes unitários no frontend e backend conforme necessário. Scripts de teste, se presentes, ficam em `package.json` de cada pasta.

## Contribuição

Abra uma issue ou crie um pull request. Para mudanças maiores, descreva a motivação e os passos para testar localmente.

## Links úteis

- Backend: `backend/src`
- Frontend: `client/src`

