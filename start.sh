#!/bin/bash

# ========================
# Start Backend
# ========================
echo "Starting backend..."
cd backend || exit
echo "Installing backend dependencies..."
npm install
echo "Starting backend..."
npm run start &

# ========================
# Start Frontend
# ========================
echo "Starting frontend..."
cd ../frontend || exit
echo "Installing frontend dependencies..."
npm install
echo "Starting frontend..."
npm start
