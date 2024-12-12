FROM node:22-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

CMD [ "node", "src/app.js" ]
