FROM alpine:latest

RUN apk update
RUN apk add bash
RUN apk add nodejs
RUN apk add npm

WORKDIR /usr/src/app

COPY . .


RUN npm install --global http-server

EXPOSE 3000

CMD [ "http-server", ".", "-p 3000" ]