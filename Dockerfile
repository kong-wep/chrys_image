FROM node:20-alpine
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
EXPOSE 3001
CMD node server.js
