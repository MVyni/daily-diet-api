# Daily Diet API ✅

[![Version](https://img.shields.io/github/v/release/MVyni/daily-diet-api)](https://github.com/MVyni/daily-diet-api/releases) [![Stars](https://img.shields.io/github/stars/MVyni/daily-diet-api)](https://github.com/MVyni/daily-diet-api/stargazers) [![Forks](https://img.shields.io/github/forks/MVyni/daily-diet-api)](https://github.com/MVyni/daily-diet-api/network) [![License](https://img.shields.io/github/license/MVyni/daily-diet-api)](https://github.com/MVyni/daily-diet-api/blob/main/LICENSE)

API developed for meal management with a focus on metrics for a healthy diet. With this application, you can track your daily meals, monitor if you're following your diet, and view important metrics about your eating habits.

## Table of Contents 📌

- [About the Project](#about-the-project-)
- [How to Run the Project](#how-to-run-the-project-)
- [Architecture](#architecture-)
- [Technologies](#technologies-)
- [Implemented Features](#implemented-features-)
- [License](#license-)

## About the Project 🔗

**Daily Diet API** is a RESTful application developed with **Node.js** and **Fastify**, designed to help users manage their daily meals and track their diet metrics. The application allows users to register their meals, classify whether they are on or off the diet, and view important statistics about their eating habits.

### Key Features

#### User Management
- **User Registration**: Create new accounts with email and password (encrypted with bcrypt).
- **Authentication**: Authentication system using JWT (JSON Web Tokens) to protect API routes.

#### Meal Management
- **Meal Registration**: Register meals with the following information:
  - Meal name
  - Description
  - Date and time
  - Indicator if it is on or off the diet
- **Meal Editing**: Ability to modify all data of an existing meal.
- **Meal Deletion**: Remove meals from history.
- **Meal Listing**: View all meals of a user.
- **Individual Viewing**: Query details of a specific meal.

#### Metrics and Statistics
- **Total Number of Meals**: Total meals registered by the user.
- **Meals on Diet**: Number of meals that are within the diet plan.
- **Meals off Diet**: Number of meals that did not follow the diet plan.
- **Best Streak**: Longest consecutive streak of meals on the diet.

#### Security and Access Control
- Each user has exclusive access to their own meals.
- Authentication required for all meal operations.
- Passwords encrypted with bcrypt.
- JWT tokens to maintain user session.

## How to Run the Project 🔧

Follow the instructions below to build and run the project simply and easily.

### Prerequisites

Make sure you have installed:

- **Node.js** (version 18 or higher)
- **PostgreSQL** (or SQLite for development)
- **npm** or **yarn**

### Database Configuration

#### Using PostgreSQL (Recommended for production)

1. Install PostgreSQL or use Docker:

```bash
docker run --name daily-diet-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=dailydiet \
  -p 5432:5432 \
  -d postgres:16
```

2. Configure the environment variables in the `.env` file:

```env
DATABASE_URL='postgresql://postgres:postgres@localhost:5432/dailydiet'
DATABASE_CLIENT=pg
NODE_ENV=development
SECRET_JWT=your-secret-key-here
```

#### Using SQLite (For development)

1. Configure the environment variables in the `.env` file:

```env
DATABASE_URL='./db/app.db'
DATABASE_CLIENT=sqlite
NODE_ENV=development
SECRET_JWT=your-secret-key-here
```

### Installation and Execution

1. Clone the repository:

```bash
git clone https://github.com/MVyni/daily-diet-api.git
cd daily-diet-api
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```bash
cp .env.example .env
# Edit the .env file with your settings
```

4. Run database migrations:

```bash
npm run knex -- migrate:latest
```

5. Start the server in development mode:

```bash
npm run dev
```

The API will be available at `http://localhost:3333` (or the configured port).

### Running Tests

```bash
npm test
```

## Architecture 🏗️

**Daily Diet API** was developed following the principles of a RESTful architecture, using modern API development best practices.

### Key Characteristics

#### RESTful Base
- The API follows REST principles, using standard HTTP methods (GET, POST, PUT, DELETE).
- Well-defined endpoints organized by resources (users, meals).
- Standardized responses with appropriate HTTP status codes.

#### Core Technologies
- **Node.js**: High-performance JavaScript runtime for building scalable applications.
- **Fastify**: Extremely fast and low-overhead web framework, with excellent TypeScript support.
- **TypeScript**: JavaScript superset that adds static typing, improving code quality and maintainability.

#### Database
- **Knex.js**: SQL query builder for Node.js with support for multiple databases.
- **PostgreSQL**: Robust and reliable relational database for production.
- **SQLite**: Lightweight option for development and testing.
- **Migrations**: Database versioning system to control schema changes.

#### Security and Authentication
- **JWT (JSON Web Tokens)**: Stateless token-based authentication.
- **bcrypt**: Secure hashing algorithm for password storage.
- **Authentication Middleware**: Protection for sensitive routes.

#### Data Validation
- **Zod**: TypeScript-first schema validation library to ensure data integrity.

#### Testing
- **Vitest**: Fast and modern testing framework.
- **Supertest**: Library for HTTP API integration testing.


## Technologies 💻

### Main Dependencies
- **fastify**: Fast and efficient web framework
- **jsonwebtoken**: JWT token generation and validation
- **bcrypt**: Password hashing
- **knex**: SQL query builder
- **pg**: PostgreSQL driver
- **zod**: Schema validation
- **dotenv**: Environment variable management

### Development Dependencies
- **typescript**: JavaScript superset with static typing
- **tsx**: TypeScript executor for development
- **vitest**: Testing framework
- **supertest**: HTTP API testing
- **@types/***: TypeScript type definitions

## Implemented Features ✅

- [x] It should be possible to create a user
- [x] It should be possible to identify the user between requests
- [x] It should be possible to register a meal with the following information:
    *Meals must be related to a user.*
    
    - Name
    - Description
    - Date and Time
    - Whether it is on or off the diet
    
- [x] It should be possible to edit a meal, being able to change all the above data
- [x] It should be possible to delete a meal
- [x] It should be possible to list all meals of a user
- [x] It should be possible to view a single meal
- [x] It should be possible to retrieve a user's metrics
    - [x] Total number of registered meals
    - [x] Total number of meals on the diet
    - [x] Total number of meals off the diet
    - [x] Best streak of meals on the diet
- [x] The user can only view, edit, and delete the meals they created