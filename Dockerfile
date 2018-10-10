FROM node:10-alpine

# Switch to working directory
WORKDIR /usr/app

# Install dependencies
COPY package.json .
RUN npm install --quiet

# Copy contents of local folder to `WORKDIR`
COPY . .
