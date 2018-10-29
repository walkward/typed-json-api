#!/usr/bin/env bash

# Bring up cluster
ecs-cli up \
  --keypair clique-graphql-api \
  --capability-iam \
  --size 1 \
  --instance-type t2.micro \
  --cluster-config default \
  --port 5000 \
  --cluster clique-graphql-api-cluster

# Compose up service
ecs-cli compose \
  --file docker-compose.prod.yml \
  --file docker-compose.yml \
  up \
  --create-log-groups \
  --cluster-config default

# Compose down service
ecs-cli compose \
  --file docker-compose.prod.yml \
  --file docker-compose.yml \
  down \
  --cluster-config default

# Remove service
ecs-cli compose \
  --file docker-compose.prod.yml \
  --file docker-compose.yml \
  rm \
  --create-log-groups \
  --cluster-config default

# Bring down cluster
ecs-cli down \
  --force \
  --cluster-config default \
  --cluster clique-graphql-api-cluster
