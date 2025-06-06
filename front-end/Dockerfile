FROM node:18-alpine

WORKDIR /app

COPY package*.json .
RUN npm i
COPY . .

#run after smw ny sdh ada
CMD ["npm", "run", "dev", "--host"]