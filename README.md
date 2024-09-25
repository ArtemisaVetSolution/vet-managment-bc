# Artemisa Vet Management API

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Running the Application](#running-the-application)
  - [Development Mode](#development-mode)
  - [Production Mode](#production-mode)
- [Dependencies](#dependencies)
- [Development Dependencies](#development-dependencies)
- [Testing](#testing)
- [Linting and Formatting](#linting-and-formatting)
- [API Documentation](#api-documentation)
- [Contributions](#contributions)
- [License](#license)

## Description
Artemisa Vet Management API is an API built with [NestJS](https://nestjs.com/), designed to manage users efficiently and securely. It uses modern technologies such as TypeORM for database management and Winston for logging.

## Features
- Appointments management
- Patients management 
- File creation and uploading
- Robust data validation
- Integration with PostgreSQL databases
- Automatic API documentation with Swagger
- Advanced logging with file rotation
- Support for unit and integration tests

## Prerequisites
Before starting, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (if using the default database)

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/ArtemisaVetSolution/vet-managment-bc.git
    cd vet-management-bc
    ```

2. **Install the dependencies**:

    Using npm:
    ```bash
    npm install
    ```

## Configuration .env file in the project root

```env
# .env
DB_PASSWORD=MyPassword
DB_NAME=MyDatabase
DB_HOST=localhost
DB_USERNAME=postgres
DB_PORT=5437
PORT=3002
USER_MAIL=my-email@gmail.com
USER_MAIL_PASSWORD=my-email-password

MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=25
MAIL_USER=user
MAIL_PASSWORD=password
```
## Available Scripts

The project includes several scripts to facilitate development and deployment:

| Command                | Description                                                       |
|------------------------|-------------------------------------------------------------------|
| `npm run start:dev`     | Starts the application in development mode with `nodemon`.        |
| `npm run build`         | Compiles the project using Nest CLI.                              |
| `npm run format`        | Formats the source code with Prettier.                            |
| `npm run start`         | Starts the application in production mode.                        |
| `npm run start:nest-watch` | Starts the application with Nest in watch mode.                |
| `npm run start:debug`   | Starts the application in debug mode with watch.                  |
| `npm run start:prod`    | Starts the compiled application in the `dist/` folder.            |
| `npm run lint`          | Lints the source code with ESLint and applies automatic fixes.    |
| `npm run test`          | Runs unit tests with Jest.                                        |
| `npm run test:watch`    | Runs tests in watch mode.                                         |
| `npm run test:cov`      | Runs tests and generates a coverage report.                       |
| `npm run test:debug`    | Runs tests in debug mode.                                         |
| `npm run test:e2e`      | Runs end-to-end/integration tests.                                |

## Running the Application

### Development Mode

To start the application in development mode, which automatically reloads on code changes:

```bash
npm run start:dev`

```

### Production Mode

## 1- Compile the project:

```bash
npm run build
```

## 2- Start the compiled application:
```bash
npm run start:prod
```

## Dependencies

| Package                      | Description                                                    |
|------------------------------|----------------------------------------------------------------|
| `@nestjs/axios`              | NestJS module for making HTTP requests using Axios.           |
| `@nestjs/common`             | Common NestJS components like decorators, pipes, and exceptions. |
| `@nestjs/config`             | Environment variables and configuration management.           |
| `@nestjs/core`               | Core of NestJS providing the main framework functionality.    |
| `@nestjs/mapped-types`       | Utilities for mapping types in NestJS, useful for DTOs.       |
| `@nestjs/platform-express`   | Adapter for Express.js in NestJS.                              |
| `@nestjs/swagger`            | Generates API documentation using Swagger.                    |
| `@nestjs/typeorm`            | Integration of TypeORM with NestJS for database management.   |
| `axios`                      | Promise-based HTTP client for the browser and Node.js.         |
| `class-transformer`          | Transforms plain objects into class instances.               |
| `class-validator`            | Data validation based on decorators for classes.             |
| `date-fns`                   | Modern JavaScript date utility library.                      |
| `joi`                        | Validation schemas for JavaScript objects.                   |
| `jsonwebtoken`               | JSON Web Token (JWT) implementation.                         |
| `nodemailer`                 | Sending emails from Node.js.                                 |
| `pdfmake`                    | PDF generation library for client and server.                |
| `pg`                         | PostgreSQL client for Node.js.                                |
| `reflect-metadata`           | Metadata support in TypeScript, necessary for decorators.     |
| `rxjs`                       | Library for reactive programming.                            |
| `typeorm`                    | ORM for TypeScript and JavaScript.                           |
| `winston`                    | Logging library for Node.js.                                 |
| `winston-daily-rotate-file`  | Winston transport for daily log rotation.                    |

## Development Dependencies

| Package                               | Description                                                    |
|---------------------------------------|----------------------------------------------------------------|
| `@nestjs/cli`                         | Command-line tool for NestJS.                                  |
| `@nestjs/schematics`                  | Schematics for generating NestJS components.                   |
| `@nestjs/testing`                     | Testing utilities for NestJS.                                  |
| `@types/express`                      | TypeScript types for Express.js.                               |
| `@types/jest`                         | TypeScript types for Jest.                                     |
| `@types/jsonwebtoken`                 | TypeScript types for `jsonwebtoken`.                           |
| `@types/multer`                       | TypeScript types for `multer`.                                 |
| `@types/node`                         | TypeScript types for Node.js.                                  |
| `@types/pdfmake`                      | TypeScript types for `pdfmake`.                                |
| `@types/supertest`                    | TypeScript types for SuperTest.                                |
| `@types/uuid`                         | TypeScript types for `uuid`.                                   |
| `@typescript-eslint/eslint-plugin`    | ESLint plugin for TypeScript.                                  |
| `@typescript-eslint/parser`           | ESLint parser for TypeScript.                                  |
| `eslint`                              | Linter for identifying and reporting patterns in code.         |
| `eslint-config-prettier`              | Disables ESLint rules that might conflict with Prettier.       |
| `eslint-plugin-prettier`              | Integrates Prettier with ESLint.                               |
| `jest`                                | Testing framework for JavaScript.                              |
| `nodemon`                             | Tool that automatically restarts the application on changes.   |
| `prettier`                            | Code formatter.                                                |
| `source-map-support`                  | Improves Node.js error messages with source map support.       |
| `supertest`                           | Library for integration testing of APIs.                       |
| `ts-jest`                             | Jest preprocessor for TypeScript.                              |
| `ts-loader`                           | TypeScript loader for Webpack.                                 |
| `ts-node`                             | Runs TypeScript files directly in Node.js.                     |
| `tsconfig-paths`                      | Support for paths in `tsconfig.json`.                          |
| `typescript`                          | Superset of JavaScript that adds static types.                 |


## Testing

To run the tests:
```bash
npm run test
```

To run the tests in watch mode:
```bash
npm run test:watch
```
To run the tests and generate a coverage report:
```bash
npm run test:cov
```
To run the end-to-end tests:
```bash
npm run test:e2e
```


## Linting and Formatting

To lint the code and apply automatic fixes:
```bash
npm run lint
```
To format the code:
```bash
npm run format
```

## The API documentation is automatically generated using Swagger. To access the documentation, start the application and navigate to [/api/v1/docs](http://localhost:3002/api/v1/docs#/) in your browser.
