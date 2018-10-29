FROM node:10-alpine

# Switch to working directory
WORKDIR /usr/app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --silent

# Copy contents of local folder to `WORKDIR`
COPY . .
