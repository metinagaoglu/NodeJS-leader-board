FROM alpine:latest

RUN apk update
RUN apk add bash
RUN apk add nodejs
RUN apk add npm

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8080

USER node
CMD [ "node", "bin/www" ]
