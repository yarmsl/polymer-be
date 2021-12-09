FROM node:14-alpine
ENV NODE_ENV production
WORKDIR /app
ADD package.json package.json
ADD . .
VOLUME ["/app/uploads"]
CMD ["npm", "run", "start"]
EXPOSE 5000