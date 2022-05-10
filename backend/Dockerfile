FROM node:16-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 8000

EXPOSE 9100

ENV PORT 8000

ENV METRICS_SERVER_PORT=9100

ENV NODE_ENV prd

CMD ["yarn", "start"]