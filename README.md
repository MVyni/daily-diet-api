# Daily Diet API ✅

[![Version](https://img.shields.io/github/v/release/MVyni/daily-diet-api)](https://github.com/MVyni/daily-diet-api/releases) [![Stars](https://img.shields.io/github/stars/MVyni/daily-diet-api)](https://github.com/MVyni/daily-diet-api/stargazers) [![Forks](https://img.shields.io/github/forks/MVyni/daily-diet-api)](https://github.com/MVyni/daily-diet-api/network) [![License](https://img.shields.io/github/license/MVyni/daily-diet-api)](https://github.com/MVyni/daily-diet-api/blob/main/LICENSE)

API desenvolvida para gestão de refeições com foco em métricas para uma dieta saudável. Com esta aplicação, você pode controlar suas refeições diárias, acompanhar se está seguindo sua dieta e visualizar métricas importantes sobre seus hábitos alimentares.

## Índice 📌

- [Sobre o projeto](#sobre-o-projeto-)
- [Como executar o projeto](#como-executar-o-projeto-)
- [Arquitetura utilizada](#arquitetura-utilizada-)
- [Tecnologias](#tecnologias-)
- [Funcionalidades implementadas](#funcionalidades-implementadas-)
- [Licença](#licença-)

## Sobre o projeto 🔗

O **Daily Diet API** é uma aplicação RESTful desenvolvida com **Node.js** e **Fastify**, projetada para ajudar usuários a gerenciar suas refeições diárias e acompanhar suas métricas de dieta. A aplicação permite que os usuários registrem suas refeições, classifiquem se estão dentro ou fora da dieta, e visualizem estatísticas importantes sobre seus hábitos alimentares.

### Principais funcionalidades

#### Gerenciamento de Usuários
- **Cadastro de usuário**: Criação de novas contas com email e senha (criptografada com bcrypt).
- **Autenticação**: Sistema de autenticação utilizando JWT (JSON Web Tokens) para proteger as rotas da API.

#### Gerenciamento de Refeições
- **Registro de refeições**: Cadastro de refeições com as seguintes informações:
  - Nome da refeição
  - Descrição
  - Data e hora
  - Indicador se está dentro ou fora da dieta
- **Edição de refeições**: Possibilidade de alterar todos os dados de uma refeição existente.
- **Exclusão de refeições**: Remoção de refeições do histórico.
- **Listagem de refeições**: Visualização de todas as refeições de um usuário.
- **Visualização individual**: Consulta de detalhes de uma refeição específica.

#### Métricas e Estatísticas
- **Quantidade total de refeições**: Total de refeições registradas pelo usuário.
- **Refeições dentro da dieta**: Quantidade de refeições que estão dentro do plano alimentar.
- **Refeições fora da dieta**: Quantidade de refeições que não seguiram o plano alimentar.
- **Melhor sequência**: Maior sequência consecutiva de refeições dentro da dieta.

#### Segurança e Controle de Acesso
- Cada usuário tem acesso exclusivo às suas próprias refeições.
- Autenticação obrigatória para todas as operações de refeições.
- Senhas criptografadas com bcrypt.
- Tokens JWT para manter a sessão do usuário.

## Como executar o projeto 🔧

Siga as instruções abaixo para construir e executar o projeto de forma simples e fácil.

### Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **PostgreSQL** (ou SQLite para desenvolvimento)
- **npm** ou **yarn**

### Configuração do Banco de Dados

#### Usando PostgreSQL (Recomendado para produção)

1. Instale o PostgreSQL ou utilize Docker:

```bash
docker run --name daily-diet-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=dailydiet \
  -p 5432:5432 \
  -d postgres:16
```

2. Configure as variáveis de ambiente no arquivo `.env`:

```env
DATABASE_URL='postgresql://postgres:postgres@localhost:5432/dailydiet'
DATABASE_CLIENT=pg
NODE_ENV=development
SECRET_JWT=your-secret-key-here
```

#### Usando SQLite (Para desenvolvimento)

1. Configure as variáveis de ambiente no arquivo `.env`:

```env
DATABASE_URL='./db/app.db'
DATABASE_CLIENT=sqlite
NODE_ENV=development
SECRET_JWT=your-secret-key-here
```

### Instalação e Execução

1. Clone o repositório:

```bash
git clone https://github.com/MVyni/daily-diet-api.git
cd daily-diet-api
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Execute as migrações do banco de dados:

```bash
npm run knex -- migrate:latest
```

5. Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

A API estará disponível em `http://localhost:3333` (ou a porta configurada).

### Executando os testes

```bash
npm test
```

## Arquitetura utilizada 🏗️

A **Daily Diet API** foi desenvolvida seguindo os princípios de uma arquitetura RESTful, utilizando as melhores práticas de desenvolvimento de APIs modernas.

### Características principais

#### Base RESTful
- A API segue os princípios REST, utilizando métodos HTTP padrão (GET, POST, PUT, DELETE).
- Endpoints bem definidos e organizados por recursos (users, meals).
- Respostas padronizadas com códigos de status HTTP apropriados.

#### Tecnologias Core
- **Node.js**: Runtime JavaScript de alta performance para construção de aplicações escaláveis.
- **Fastify**: Framework web extremamente rápido e de baixo overhead, com excelente suporte a TypeScript.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática, melhorando a qualidade e manutenibilidade do código.

#### Banco de Dados
- **Knex.js**: Query builder SQL para Node.js com suporte a múltiplos bancos de dados.
- **PostgreSQL**: Banco de dados relacional robusto e confiável para produção.
- **SQLite**: Opção leve para desenvolvimento e testes.
- **Migrations**: Sistema de versionamento de banco de dados para controlar alterações no schema.

#### Segurança e Autenticação
- **JWT (JSON Web Tokens)**: Autenticação stateless baseada em tokens.
- **bcrypt**: Algoritmo de hashing seguro para armazenamento de senhas.
- **Middleware de autenticação**: Proteção de rotas sensíveis.

#### Validação de Dados
- **Zod**: Biblioteca de validação de schema TypeScript-first para garantir a integridade dos dados.

#### Testes
- **Vitest**: Framework de testes rápido e moderno.
- **Supertest**: Biblioteca para testes de integração de APIs HTTP.



## Tecnologias 💻

### Dependências principais
- **fastify**: Framework web rápido e eficiente
- **jsonwebtoken**: Geração e validação de tokens JWT
- **bcrypt**: Hashing de senhas
- **knex**: Query builder SQL
- **pg**: Driver PostgreSQL
- **zod**: Validação de schemas
- **dotenv**: Gerenciamento de variáveis de ambiente

### Dependências de desenvolvimento
- **typescript**: Superset JavaScript com tipagem estática
- **tsx**: Executor TypeScript para desenvolvimento
- **vitest**: Framework de testes
- **supertest**: Testes de APIs HTTP
- **@types/***: Definições de tipos TypeScript

## Funcionalidades implementadas ✅

- [x] Deve ser possível criar um usuário
- [x] Deve ser possível identificar o usuário entre as requisições
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
    *As refeições devem ser relacionadas a um usuário.*
    
    - Nome
    - Descrição
    - Data e Hora
    - Está dentro ou não da dieta
    
- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [x] Deve ser possível recuperar as métricas de um usuário
    - [x] Quantidade total de refeições registradas
    - [x] Quantidade total de refeições dentro da dieta
    - [x] Quantidade total de refeições fora da dieta
    - [x] Melhor sequência de refeições dentro da dieta
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

## Licença 📋

Este projeto está sob a licença ISC. Sinta-se à vontade para usar, estudar e contribuir com o projeto. ❤️