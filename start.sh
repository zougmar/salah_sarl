#!/bin/bash

# ----------------------
# Start Backend
# ----------------------
echo "Starting backend..."
cd backend || exit
npm install
node index.js &    # Replace 'index.js' with your backend entry file

# ----------------------
# Build & Serve Frontend
# ----------------------
echo "Building and serving frontend..."
cd ../frontend || exit
npm install
npm run build
npx serve -s build --single
