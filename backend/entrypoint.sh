#!/bin/sh
echo "Rodando migrations..."
npx drizzle-kit generate
npx drizzle-kit migrate
echo "Subindo servidor..."
exec yarn dev