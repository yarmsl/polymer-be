FROM node:14-alpine
WORKDIR /app
ADD package.json package.json
ADD yarn.lock yarn.lock
RUN yarn install
ADD . .
RUN yarn build
VOLUME ["/app/uploads"]
CMD ["yarn", "prod"]
EXPOSE 5000