#!/bin/sh

# Run Prisma migrations
npx prisma migrate deploy --schema=/app/packages/db/prisma/schema.prisma
npx prisma generate --schema=/app/packages/db/prisma/schema.prisma

# Start the backend
node /app/apps/backend/dist/index.js &

# Start the frontend
npm --prefix /app/apps/chat-app run start
