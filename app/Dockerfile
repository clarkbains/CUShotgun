FROM mhart/alpine-node:14
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY package.json ./
RUN npm install --only=prod
COPY . .
EXPOSE 80
CMD [ "node", "server.js" ]
