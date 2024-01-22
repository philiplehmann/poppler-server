FROM node:lts-bookworm as builder

WORKDIR /app

COPY index.ts package.json yarn.lock tsconfig.json .yarnrc.yml  ./
COPY .yarn/releases/ /app/.yarn/releases

RUN yarn install; \
    yarn build;

FROM node:lts-bookworm-slim as runner

WORKDIR /app

COPY --from=builder /app/index.mjs ./

RUN apt-get update; \
    apt-get install --no-install-recommends poppler-utils=22.12.0-2+b1 -y;

CMD ["node", "/app/index.mjs"]
