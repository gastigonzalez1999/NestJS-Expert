<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod

#build db
$ docker-compose up -d

#Clone .env.template and rename to .env

#Build db with seed data
$ localhost:300/api/v2/seed
```

# Production Build
1. Create .env.prod
2. Fill it with env vars
3. Build the image 
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
