FROM node:9-alpine

ENV HOST=0.0.0.0

ENV PORT 3000
EXPOSE 3000

WORKDIR /usr/src/app
COPY . .

ENV NODE_ENV=container

RUN npm run build
RUN npm prune
CMD npm start
