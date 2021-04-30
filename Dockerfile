FROM node:15.12.0

WORKDIR /usr

COPY ./src ./src

COPY ./package*.json ./

RUN yarn install

RUN yarn build

COPY ./ ./
COPY ./.env ./dist

EXPOSE 3333

CMD ["yarn","start"]