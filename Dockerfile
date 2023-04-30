FROM node:current-alpine

WORKDIR /app
COPY package.json .
RUN npm install --production
COPY . .

WORKDIR /app/client
RUN npm install --production
# RUN npm run-script build

WORKDIR /app
COPY . .

ENV PORT=5000
CMD [ "npm","start" ]