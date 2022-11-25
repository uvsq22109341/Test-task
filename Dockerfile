FROM node:16-alpine

WORKDIR /BACKEND-TEST

ADD package.json /BACKEND-TEST/package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install

ADD . /BACKEND-TEST

EXPOSE 3000

CMD ["npm", "run", "start:dev"]