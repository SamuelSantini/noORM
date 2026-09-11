# CRUD de usuários (sem ORM)

API fullstack simples com Express, PostgreSQL (`pg`) e frontend HTML/JS. SQL puro, sem ORM.

## Stack

- Node.js + Express
- PostgreSQL (`pg`)
- HTML / JavaScript
- `dotenv` para variáveis de ambiente
- `nodemon` no modo desenvolvimento

## Pré-requisitos

- Node.js
- PostgreSQL
- pgAdmin (opcional, para criar banco/tabelas)

## Configuração

### 1. Crie o banco

No PostgreSQL, crie o database `noorm` (o `CREATE DATABASE` no `sql.sql` está comentado de propósito).

No pgAdmin: clique com o botão direito em **Databases → Create → Database** e use o nome `noorm`.

### 2. Crie as tabelas **dentro** do banco `noorm`

Abra o Query Tool **conectado em `noorm`** (não em `postgres` nem em outro database) e execute o conteúdo de `sql.sql`:

```sql
CREATE TABLE usuarios(
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    idade INT,
    email VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS tarefas (
    id_tarefa SERIAL PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL,
    status VARCHAR(100) NOT NULL,
    data_criacao DATE NOT NULL,
    data_conclusao DATE,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);
```

> Se o app disser que a relação `usuarios` não existe, quase sempre a tabela foi criada em outro database. Confira se o Query Tool está em `noorm` e se o `.env` usa `DB_DATABASE=noorm`.

### 3. Variáveis de ambiente

Crie um arquivo `.env` na raiz (já ignorado pelo git via `node_modules`; o `.env` não deve ser commitado com senha real em projetos públicos):

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_DATABASE=noorm
PORT=3000
```

### 4. Instale e rode

```bash
npm install
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

O Express serve o `index.html` e o `script.js` na mesma porta da API (`PORT` do `.env`).

## Endpoints

| Método | Rota            | Descrição        |
|--------|-----------------|------------------|
| GET    | `/usuarios`     | Lista usuários   |
| POST   | `/usuarios`     | Cria usuário     |
| PUT    | `/usuarios/:id` | Atualiza usuário |
| DELETE | `/usuarios/:id` | Remove usuário   |

O parâmetro `:id` da rota corresponde à coluna `id_usuario` no banco.

Body (POST/PUT):

```json
{ "nome": "Ana", "idade": 25 }
```

> A coluna `email` existe na tabela e no formulário HTML, mas o backend/frontend ainda não persistem o e-mail. A tabela `tarefas` também está no schema, porém ainda sem rotas.

## Estrutura

```
├── index.html      # Frontend (cadastro e lista)
├── script.js       # Chamadas fetch à API
├── server.js       # Express + rotas /usuarios
├── db.js           # Pool de conexão PostgreSQL
├── sql.sql         # Schema (usuarios e tarefas)
├── package.json    # Dependências e script "dev"
├── .env            # Credenciais locais
└── .gitignore      # node_modules
```

## Observações

- PK da tabela: `id_usuario` (não `id`)
- Script npm: `npm run dev` (não há script `start`)
- Database esperado: `noorm`
