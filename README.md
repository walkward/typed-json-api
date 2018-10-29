- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [CLI](#cli)
- [Typescript](#typescript)
- [Database](#database)
- [Testing](#testing)

### Getting Started

Prerequisites:
- Node.js
- Yarn

Installation:

```console
yarn install
```

Add a .env file with some values *before* creating docker services

```bash
POSTGRES_HOST=postgres
POSTGRES_USER=user
POSTGRES_DB=typed-json-api
POSTGRES_PASSWORD=password
POSTGRES_PORT=5432
```

Starting postgres & redis:

```console
docker-compose up -d
```

Starting server (development):

```console
yarn start
```

### Scripts

### CLI

### Typescript

The server & tests are run using node-ts during development. 

### Database

### Testing

```console
yarn test
```
