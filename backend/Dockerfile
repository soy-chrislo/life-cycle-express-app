# Multi-Stage

# Etapa 1: Construcción
FROM node:22-alpine AS builder

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run test:build

# Etapa 2: Producción
FROM node:22-alpine AS runtime

WORKDIR /home/node/app

COPY --from=builder /home/node/app/dist ./dist

COPY package*.json ./

RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "dist/serve.js"]
