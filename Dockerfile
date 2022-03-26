FROM node:14-alpine

ADD . /usr/src/front

WORKDIR /usr/src/front

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]