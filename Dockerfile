FROM node:22-alpine3.19

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["sh", "-c", "npm run migrate && npm run start"]