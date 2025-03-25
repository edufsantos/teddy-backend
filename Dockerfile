FROM node:lts-slim AS base

WORKDIR /tmp

FROM base as deps-base

COPY package.json ./

RUN npm install

RUN npm install -g @nestjs/cli

FROM deps-base as build-base

COPY . .

RUN npm run build


FROM base as main-build

WORKDIR /app


COPY package.json ./

COPY --from=deps-base --chown=node:node /tmp/node_modules ./node_modules

COPY --from=build-base --chown=node:node /tmp/dist ./dist


EXPOSE 3000


CMD ["node", "dist/src/main"]