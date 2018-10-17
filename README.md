- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [CLI](#cli)
- [Typescript](#typescript)
- [Database](#database)
- [Testing](#testing)
- [Directory Structure](#directory-structure)
- [Todo](#todo)

### Getting Started

Prerequisites:
- Node.js
- Yarn

Installation:

```console
npm install
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
npm start
```

### Scripts

### CLI

### Typescript

The server & tests are run using ava-ts & node-ts during development. 

Everything written in es6 will be build into the "dist" directory.

### Database

### Testing

```console
npm test
```

### Directory Structure

```
|-- bin                           # Executable scripts (use shebang & es5)
|-- cli                           # CLI specific code w/ Subdirectories for each command
|-- config                        # Environment specific configs
|-- db
|   |-- migrations                
|   |-- seeds  
|-- docs                          # Docs for src/cli/db
|-- logs                          # Log files w/ service specific subdirectories                   
|-- src
|   |-- helpers                   # Helpers shared across one or more endpoint
|   |-- plugins                   # Hapi plugins
|   |-- api
|       |-- <endpoint>            # Api organized based on endpoints
|           |-- routes.js
|           |-- controllers.js
|           |-- handlers.js
|           |-- constants.js
|           |-- resource.js
|           |-- <Model>.js
|-- test
|-- types                         # Typescript declaration files
|-- utils                         # Utils shared between cli/db/src
```

### Todo

- [ ] Integrate JSON:API Implementation
- [ ] Determine pattern for operations
- [ ] Integrate PM2
- [ ] Configure logs
- [ ] Implement cat box
- [ ] Use yarn instead of npm
- [ ] Setup documentation
- [ ] Add file uploading?
- [ ] Use ioredis instead of redis
- [ ] Seeding CLI script
- [ ] Database creation CLI script
- [ ] Database recreation CLI script
- [ ] Write tests for JSON:API
- [ ] Write tests for all other modules
- [ ] Establish better patterns for error handling
- [ ] Verify swagger docs work with JSON:API
- [ ] Replace as many `any` typescript types as possible
- [ ] Write readme.md
