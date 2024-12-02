FROM node:20
WORKDIR /app


RUN npm install -g prisma


COPY package*.json turbo.json ./
RUN npm install


COPY . .


COPY packages/db/prisma ./packages/db/prisma


WORKDIR /app/apps/backend
RUN npm install
RUN npm run build


WORKDIR /app/apps/chat-app
RUN npm install
RUN npm run build

WORKDIR /app

EXPOSE 3000
EXPOSE 3001


CMD ["sh", "/app/start.sh"]
