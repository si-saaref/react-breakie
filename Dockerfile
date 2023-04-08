FROM node:14-alpine

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 5995

CMD ["yarn", "dev"]