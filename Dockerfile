FROM node:14-alpine

WORKDIR /usr/src/app

ENV PATH /usr/node_modules/.bin:$PATH

COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 2374

CMD ["yarn", "dev"]