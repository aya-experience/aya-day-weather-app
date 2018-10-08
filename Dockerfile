FROM node:9-slim

ENV HOST=0.0.0.0

ENV PORT 3000
EXPOSE 3000

WORKDIR /usr/src/app
COPY . .

RUN npm install

CMD ["npm", "start"]
