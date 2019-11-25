FROM node:lts-alpine3.10

WORKDIR /app

COPY src ./src
COPY package.json .
COPY gulpfile.js .

RUN npm install
RUN npm install -g gulp

CMD ["gulp", "start-node"]