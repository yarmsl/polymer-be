FROM node:14-alpine
WORKDIR /app
ADD package.json package.json
ADD . .
VOLUME ["/app/uploads"]
CMD ["npm", "run", "start"]
EXPOSE 5000