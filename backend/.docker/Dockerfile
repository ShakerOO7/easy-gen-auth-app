FROM node:18.17.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm i -g @nestjs/cli

COPY . .

EXPOSE 5001
CMD ["npm", "run", "start"]
