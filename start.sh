#!/bin/sh

echo "Waiting for database..."
while ! nc -z postgres 5432; do
  sleep 1
done

npx prisma migrate deploy

node .output/server/index.mjs --hostname 0.0.0.0 --port 3000
