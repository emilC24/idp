FROM node:8
WORKDIR /app-frontend
COPY package.json /app
RUN yarn install
COPY . /app-frontend
CMD ["npm", "run", "start"]