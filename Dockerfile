FROM node:latest

WORKDIR /srv/app
COPY package*.json ./
RUN npm install
COPY . .
RUN rm -rf dist && tsc && cp -r src/views dist/views
EXPOSE 5000
CMD ["node", "dist/index.js"]