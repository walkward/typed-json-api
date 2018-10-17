- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [CLI](#cli)
- [Typescript](#typescript)
- [Docker](#docker)
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
yarn install
```

Starting server:

```console
yarn start
```

### Scripts

### CLI

### Typescript

Everything written in es6 will be build into the "dist" directory.

### Docker

### Database

### Testing

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
