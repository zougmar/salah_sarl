#!/bin/bash

# Start backend
cd backend || exit
npm install
node server.js &

# Build & serve frontend
cd ../frontend || exit
npm install
npm run build
npx serve -s build --single
