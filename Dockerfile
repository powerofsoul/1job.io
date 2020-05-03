FROM nikolaik/python-nodejs

RUN mkdir -p /var/www/api
COPY . /var/www/api/
WORKDIR /var/www/api
RUN npm install
RUN npm run build:server

# Expose a port and start the server (you may need to change the name here to match your server file)
EXPOSE 3000
CMD ["node", "dist/server/index.js"]