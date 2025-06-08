FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY user_amenity_service/ .

RUN npm i

CMD ["node", "index.js"]