# 🚀 Projeto de Segunda - Sistema de Alunos (NestJS + Prisma + MySQL)

API Backend desenvolvida em **NestJS** integrada ao banco de dados **MySQL** via **Prisma ORM**, contando com travas de segurança rigorosas usando `class-validator` e `class-transformer`.

---

## 🛠️ Tecnologias Utilizadas

* **Node.js** & **TypeScript**
* **NestJS v12** (Framework backend)
* **Prisma ORM v7** (ORM com driver adapter `@prisma/adapter-mariadb`)
* **MySQL** (Banco de dados relacional)
* **Class Validator** & **Class Transformer** (Validações de DTO e controle rigoroso de payload)
* **Vitest** (Suíte de testes unitários rápidos)

---

## 🗄️ Estrutura do Banco de Dados (`schema.prisma`)

Tabela `alunos`:

| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | `Int` | Chave primária autoincrementável |
| `nome` | `String` | Nome do aluno |
| `email` | `String` | E-mail único do aluno |
| `curso` | `String` | Nome do curso |
| `createdAt` | `DateTime` | Data de criação do registro |
| `updatedAt` | `DateTime` | Data da última atualização |

---

## 🔧 Configuração e Instalação

### 1. Clonar e instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente (`.env`)
Crie ou edite o arquivo `.env` na raiz do projeto com as credenciais do seu MySQL:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/projeto_de_segunda"
```

### 3. Sincronizar o schema com o MySQL
```bash
# Gerar o cliente do Prisma
npm run prisma:generate

# Sincronizar as tabelas no MySQL
npx prisma db push
```

---

## 🚀 Executando a Aplicação

```bash
# Modo desenvolvimento (Watch Mode)
npm run start:dev

# Modo produção
npm run build
npm run start:prod
```

A aplicação estará rodando em: `http://localhost:3000`

---

## 🧪 Guia de Testes das Rotas (Thunder Client / Postman / Insomnia)

### 🟢 1. Criar um Aluno (`POST /alunos`)
* **URL:** `http://localhost:3000/alunos`
* **Método:** `POST`
* **Header:** `Content-Type: application/json`
* **Body (JSON):**
```json
{
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "curso": "Engenharia de Software"
}
```
* **Status Esperado:** `201 Created`
* **Resposta Esperada:**
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "curso": "Engenharia de Software",
  "createdAt": "2026-09-14T21:50:00.000Z",
  "updatedAt": "2026-09-14T21:50:00.000Z"
}
```

#### 🛡️ Teste de Validação / Segurança (`400 Bad Request`)
Se você tentar enviar dados inválidos (ex: e-mail inválido ou campos adicionais não permitidos):
```json
{
  "nome": "João",
  "email": "email_invalido",
  "campoExtra": "hacker"
}
```
* **Status Esperado:** `400 Bad Request`
* **Resposta Esperada:**
```json
{
  "message": [
    "O campo \"email\" deve conter um e-mail válido.",
    "O campo \"curso\" não pode ser vazio.",
    "property campoExtra should not exist"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

---

### 🔵 2. Listar todos os Alunos (`GET /alunos`)
* **URL:** `http://localhost:3000/alunos`
* **Método:** `GET`
* **Status Esperado:** `200 OK`
* **Resposta Esperada:** Renderiza o Dashboard HTML dinâmico com a lista de alunos cadastrados.

---

### 🟡 3. Buscar Aluno por ID (`GET /alunos/:id`)
* **URL:** `http://localhost:3000/alunos/1`
* **Método:** `GET`
* **Status Esperado:** `200 OK`

*(Se o ID não existir, retorna `404 Not Found`: `{"message": "Aluno com ID 999 não encontrado", "error": "Not Found", "statusCode": 404}`)*

---

### 🟠 4. Atualizar Aluno (`PATCH /alunos/:id`)
* **URL:** `http://localhost:3000/alunos/1`
* **Método:** `PATCH`
* **Body (JSON):**
```json
{
  "curso": "Ciência da Computação"
}
```
* **Status Esperado:** `200 OK`

---

### 🔴 5. Remover Aluno (`DELETE /alunos/:id`)
* **URL:** `http://localhost:3000/alunos/1`
* **Método:** `DELETE`
* **Status Esperado:** `204 No Content` (Sem corpo de resposta)

---

## 🔬 Executando os Testes Automatizados

```bash
# Executar suíte de testes unitários com Vitest
npm run test

# Checagem de linter
npm run lint

# Compilação do projeto
npm run build
```
