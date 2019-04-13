FROM node:8
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
CMD ["npm", "run", "dev"]