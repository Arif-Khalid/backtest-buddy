FROM node:20-alpine3.19

COPY ./package.json /app/package.json

COPY ./package-lock.json /app/package-lock.json

WORKDIR /app

RUN npm ci

COPY ./ /app

CMD ["npm", "run", "docker-dev"]