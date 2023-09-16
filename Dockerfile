FROM node:gallium-alpine as production
WORKDIR /app

COPY package*.json yarn.lock ./
COPY tsconfig*.json ./
COPY ./src ./src

RUN yarn install && \
    yarn build

EXPOSE ${APP_PORT}

CMD ["yarn", "start"]