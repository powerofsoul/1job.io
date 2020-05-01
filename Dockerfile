FROM alpine:3.7
RUN apk update && apk add -U nodejs

RUN mkdir -p /var/www/api
COPY . /var/www/api/
RUN cd /var/www/api && npm i && npm build:server

WORKDIR /var/www/api

# Expose a port and start the server (you may need to change the name here to match your server file)
EXPOSE 3000
CMD ["node", "dist/server/index.js"]