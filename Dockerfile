FROM node:20-bullseye

COPY index.ts package.json yarn.lock tsconfig.json ./

RUN apt-get update; \
    apt-get install poppler-utils -y; \
    yarn install; \
    yarn tsc

CMD ["node", "index.js"]