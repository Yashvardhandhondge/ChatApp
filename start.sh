#!/bin/sh

# Run Prisma migrations
# npx prisma migrate deploy --schema=/app/packages/db/prisma/schema.prisma
# npx prisma generate --schema=/app/packages/db/prisma/schema.prisma

npm run db:migrate
npm run db:generate

# Start the backend
# node /app/apps/backend/dist/index.js &

npm run start
# Start the frontend
# npm --prefix /app/apps/chat-app run start
