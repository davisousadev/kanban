FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN chmod +x entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]