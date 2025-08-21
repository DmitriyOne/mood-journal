FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN apk update && apk add postgresql-client

RUN npm install

COPY . .

EXPOSE 3000

ENV NODE_ENV=development

CMD ["npm", "run", "start:dev"]
