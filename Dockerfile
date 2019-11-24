FROM node:lts-alpine3.10

WORKDIR .

EXPOSE 8080

COPY src ./src
COPY package.json .
COPY gulpfile.js .

RUN yarn install

CMD ["gulp", "start-node"]