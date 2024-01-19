FROM node:lts-bookworm

COPY index.ts package.json yarn.lock tsconfig.json ./

RUN apt-get update; \
    apt-get install poppler-utils=22.12.0-2+b1 -y; \
    yarn install; \
    yarn tsc; \
    rm -rf .yarn index.ts

CMD ["node", "index.js"]
