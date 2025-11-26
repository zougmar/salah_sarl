# Quick Start Guide

Get your MongoDB backend running in 5 minutes!

## Step 1: Install Dependencies
```bash
cd backend
npm install
```

## Step 2: Set Up MongoDB

### 🚀 Fastest Option: MongoDB Atlas (Recommended)

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a free cluster (takes ~3 minutes)
4. Create database user (username + password)
5. Whitelist your IP (click "Allow Access from Anywhere" for development)
6. Click "Connect" → "Connect your application"
7. Copy the connection string

### 💻 Local Option: Install MongoDB Locally

**Windows:**
- Download from [mongodb.com/download](https://www.mongodb.com/try/download/community)
- Install and run as service

**Mac:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
# See MONGODB_SETUP.md for detailed instructions
```

## Step 3: Configure Environment

1. Copy the example env file:
   ```bash
   # Windows
   copy env.example .env
   
   # Mac/Linux
   cp env.example .env
   ```

2. Edit `.env` and add your MongoDB connection:

   **For Atlas:**
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/salahelec?retryWrites=true&w=majority
   ```

   **For Local:**
   ```env
   MONGO_URI=mongodb://localhost:27017
   MONGO_DB_NAME=salahelec
   ```

3. Generate a JWT secret (use a random string, at least 32 characters):
   ```env
   JWT_SECRET=your-random-secret-key-here-minimum-32-characters-long
   ```

## Step 4: Start the Server

```bash
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

## Step 5: Test the API

Open your browser or use curl:
```bash
curl http://localhost:5000/health
```

Should return:
```json
{"status":"ok","message":"Server is running"}
```

## 🎉 Done!

Your backend is now running and connected to MongoDB!

### Next Steps:
- Register your first user: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- Start using the API with your frontend!

### Need Help?
- See [MONGODB_SETUP.md](./MONGODB_SETUP.md) for detailed MongoDB setup
- See [README.md](./README.md) for full API documentation

