# Daily Diet API

## 📋 Descrição

A **Daily Diet API** é uma aplicação que auxilia os usuários no acompanhamento de suas refeições, organizando dados como nome, descrição, data e hora, e indicando se estão dentro ou fora de sua dieta. O objetivo deste repositório é promover uma gestão simplificada e eficiente das métricas relacionadas ao plano alimentar dos usuários.

## 🚀 Funcionalidades

A API oferece os seguintes recursos:

### Gerenciamento de Usuários
- **Cadastro de usuários**: Criação de novos usuários na plataforma
- **Identificação de usuários**: Sistema de autenticação para identificar usuários entre as requisições

### Gerenciamento de Refeições
- **Registro de refeições** com as seguintes informações:
  - Nome
  - Descrição
  - Data e hora
  - Está dentro ou não da dieta
  
- **Edição de refeições**: Permite alterar todos os dados de uma refeição cadastrada
- **Exclusão de refeições**: Remove refeições do sistema
- **Listagem de refeições**: Visualiza todas as refeições cadastradas por usuário
- **Visualização individual**: Consulta detalhes de uma refeição específica

### Métricas do Usuário
- Quantidade total de refeições registradas
- Total de refeições dentro da dieta
- Total de refeições fora da dieta
- Melhor sequência de refeições dentro da dieta

**Observação**: Cada usuário só pode visualizar, editar e apagar suas próprias refeições.

## 🛠️ Tecnologias e Arquitetura

- **Linguagem**: Node.js com TypeScript
- **Framework**: Fastify
- **Banco de Dados**: PostgreSQL
- **Query Builder**: Knex.js
- **Autenticação**: JWT (JSON Web Tokens) com a biblioteca jsonwebtoken
- **Validação**: Zod
- **Criptografia**: bcrypt para hash de senhas
- **Arquitetura**: API RESTful

### Dependências Principais
- `fastify`: Framework web rápido e de baixo overhead
- `knex`: Query builder SQL para Node.js
- `pg`: Driver PostgreSQL
- `jsonwebtoken`: Implementação de JWT para autenticação
- `bcrypt`: Hash de senhas
- `zod`: Validação de schemas e tipos

## ✅ Requisitos Funcionais

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