# CRUD de usuários (sem ORM)

API fullstack simples com Express, PostgreSQL (`pg`) e frontend HTML/JS. SQL puro, sem ORM.

## Stack

- Node.js + Express
- PostgreSQL
- HTML / JavaScript

## Pré-requisitos

- Node.js
- PostgreSQL

## Configuração

1. Crie o banco e a tabela:

```bash
psql -U postgres -f sql.sql
```

2. Copie as variáveis de ambiente e ajuste se necessário:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_DATABASE=crud
PORT=3000
```

3. Instale as dependências e inicie:

```bash
npm install
npm start
```

Acesse: `http://localhost:3000`

## Endpoints

| Método | Rota            | Descrição              |
|--------|-----------------|------------------------|
| GET    | `/usuarios`     | Lista usuários         |
| POST   | `/usuarios`     | Cria usuário           |
| PUT    | `/usuarios/:id` | Atualiza usuário       |
| DELETE | `/usuarios/:id` | Remove usuário         |

Body (POST/PUT):

```json
{ "nome": "Ana", "idade": 25 }
```

## Estrutura

```
├── index.html   # Frontend
├── script.js    # Chamadas à API
├── server.js    # Rotas Express
├── db.js        # Pool PostgreSQL
├── sql.sql      # Schema
└── .env         # Credenciais
```
