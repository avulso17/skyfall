# Buildando o projeto
FROM node:lts AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY public ./public
COPY rollup ./rollup
COPY src ./src
COPY .babelrc ./
COPY index.html ./
COPY tsconfig.json /app

RUN npm run build

# Rodando o projeto
FROM node:lts AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app ./

RUN npm install --production

EXPOSE 3000

CMD ["npm", "run", "start"]