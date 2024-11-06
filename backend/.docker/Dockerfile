FROM node:18.17.1 As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm i -g @nestjs/cli
RUN npm i -g typeorm

COPY . .

EXPOSE 5001
CMD ["npm", "run", "start:dev"]
