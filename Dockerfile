FROM node

WORKDIR /app_docker

# COPY package.json/app_docker
COPY . .

RUN npm install

# EXPOSE 3000

CMD npm run start