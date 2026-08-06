# 💈 EventPass - API de Agendamento para Barbearia

> API RESTful desenvolvida em **NestJS** com **Prisma ORM** e **SQLite** para gerenciamento de clientes, barbeiros e agendamentos de cortes de cabelo com validação automática de conflitos de horários.

---

##  Sumário
- [Sobre o Projeto](#-sobre-o-projeto)
- [Arquitetura & Tecnologias](#-arquitetura--tecnologias)
- [Modelagem do Banco de Dados](#-modelagem-do-banco-de-dados)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Execução](#-instalação-e-execução)
- [Documentação da API (Swagger)](#-documentação-da-api-swagger)
- [Regras de Negócio Implementadas](#-regras-de-negócio-implementadas)
- [Rotas da API](#-rotas-da-api)

---

##  Sobre o Projeto

O **EventPass - Barbearia** é uma solução de back-end completa criada para automatizar o processo de agendamento de serviços em uma barbearia. O sistema permite cadastrar clientes (usuários), profissionais (barbeiros) e gerenciar os agendamentos de forma segura e eficiente, prevenindo erros operacionais como sobreposição de horários para o mesmo barbeiro ou duplicidade de e-mails de clientes.

---

##  Arquitetura & Tecnologias

O projeto foi construído utilizando os padrões de arquitetura modular recomendados pelo **NestJS**, garantindo alta escalabilidade, separação de responsabilidades e injeção de dependência eficiente.

- **[NestJS](https://nestjs.com/)**: Framework Node.js progressivo para construção de aplicações eficientes e escaláveis.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset JavaScript para tipagem estática e prevenção de erros em tempo de compilação.
- **[Prisma ORM v7](https://www.prisma.io/)**: ORM moderno para interação type-safe com o banco de dados.
- **[SQLite](https://www.sqlite.org/)**: Banco de dados relacional em arquivo (`dev.db`), integrado via `@prisma/adapter-better-sqlite3`.
- **[Swagger / OpenAPI](https://swagger.io/)**: Interface gráfica interativa para documentação e testes das rotas diretamente no navegador.

---

##  Modelagem do Banco de Dados

A estrutura relacional foi modelada utilizando três entidades principais:

```prisma
// 1. Cliente / Usuário
model Usuario {
  id      String   @id @default(uuid())
  nome    String
  email   String   @unique
  eventos Evento[]
}

// 2. Barbeiro
model Barbeiro {
  id            String   @id @default(uuid())
  nome          String
  especialidade String
  eventos       Evento[]
}

// 3. Agendamento / Evento
model Evento {
  id         String   @id @default(uuid())
  startTime  DateTime
  endTime    DateTime
  usuarioId  String
  usuario    Usuario  @relation(fields: [usuarioId], references: [id])
  barbeiroId String
  barbeiro   Barbeiro @relation(fields: [barbeiroId], references: [id])
}


---

##  Instalação e Execução

1. Clonar o repositório e entrar na pasta do projeto

git clone <url-do-repositorio>


2. Instalar as dependências do projeto

npm install

3. Executar as migrações do banco de dados e gerar o Prisma 

npx prisma migrate dev

npx prisma 

4. Iniciar a aplicação em modo de desenvolvimento


npm run start:dev

A API estará rodando em: http://localhost:3000

Documentação da API (Swagger)
A aplicação conta com documentação interativa gerada automaticamente pelo Swagger, com exemplos e descrições pré-configurados nos DTOs.

Após iniciar a aplicação, acesse no seu navegador:

 http://localhost:3000/api

Pela interface do Swagger, você poderá:

Testar a criação, listagem, atualização e exclusão de Usuários, Barbeiros e Agendamentos.

Executar os testes sem precisar preencher dados do zero (exemplos pré-carregados).





##  Rotas da API

Usuários (/usuarios)
POST /usuarios - Cadastra um novo cliente

GET /usuarios - Lista todos os clientes

GET /usuarios/:id - Busca um cliente por ID

PATCH /usuarios/:id - Atualiza dados de um cliente

DELETE /usuarios/:id - Remove um cliente

Barbeiros (/barbeiros)
POST /barbeiros - Cadastra um novo barbeiro

GET /barbeiros - Lista todos os barbeiros

GET /barbeiros/:id - Busca um barbeiro por ID

PATCH /barbeiros/:id - Atualiza dados de um barbeiro

DELETE /barbeiros/:id - Remove um barbeiro

Agendamentos / Eventos (/eventos)
POST /eventos - Cria um agendamento (valida conflitos)

GET /eventos - Lista todos os agendamentos (inclui dados do cliente e barbeiro)

GET /eventos/:id - Busca um agendamento por ID

PATCH /eventos/:id - Atualiza um agendamento

DELETE /eventos/:id - Cancela/remove um agendamento