FROM node:16 AS BUILD_CLIENT

WORKDIR /app
RUN git clone https://github.com/IAmOscar-Liu/device-management-service.git client
COPY /client/.env ./client

WORKDIR /app/client
RUN npm install
RUN npm run build
RUN rm -rf node_modules

FROM node:16 AS BUILD_SERVER

ENV NODE_ENV production
# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
COPY --from=BUILD_CLIENT /app/client/build ./public
RUN rm -rf client

EXPOSE 5001
CMD [ "node", "index.js" ]