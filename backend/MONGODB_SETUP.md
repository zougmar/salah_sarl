# MongoDB Setup Guide

This guide will help you set up MongoDB for the SalahElec backend. You have two options:

## Option 1: MongoDB Atlas (Cloud - Recommended for Development)

MongoDB Atlas is a free cloud-hosted MongoDB service. It's the easiest way to get started.

### Step 1: Create a MongoDB Atlas Account
1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" and sign up for a free account
3. Verify your email address

### Step 2: Create a Cluster
1. After logging in, click "Build a Database"
2. Choose the **FREE** (M0) tier
3. Select a cloud provider and region (choose one closest to you)
4. Click "Create Cluster" (this may take a few minutes)

### Step 3: Create Database User
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter a username and password (save these!)
5. Set privileges to "Atlas admin" or "Read and write to any database"
6. Click "Add User"

### Step 4: Whitelist Your IP Address
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development) or add your specific IP
4. Click "Confirm"

### Step 5: Get Your Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string (it looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `salahelec` or add it to the connection string

### Step 6: Update Your .env File
Update your `.env` file with the Atlas connection string:

```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/salahelec?retryWrites=true&w=majority
MONGO_DB_NAME=salahelec
```

**Note:** For Atlas, you can put the database name in the connection string, so `MONGO_DB_NAME` is optional.

---

## Option 2: Local MongoDB Installation

### Windows Installation

1. **Download MongoDB Community Server**
   - Go to [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - Select Windows as your platform
   - Download the MSI installer

2. **Install MongoDB**
   - Run the installer
   - Choose "Complete" installation
   - Check "Install MongoDB as a Service"
   - Keep the default service name "MongoDB"
   - Install MongoDB Compass (GUI tool) if you want

3. **Verify Installation**
   - MongoDB should start automatically as a Windows service
   - You can verify by opening Services (services.msc) and checking for "MongoDB"

4. **Update Your .env File**
   ```env
   MONGO_URI=mongodb://localhost:27017
   MONGO_DB_NAME=salahelec
   ```

### macOS Installation

1. **Using Homebrew (Recommended)**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   ```

2. **Start MongoDB**
   ```bash
   brew services start mongodb-community
   ```

3. **Update Your .env File**
   ```env
   MONGO_URI=mongodb://localhost:27017
   MONGO_DB_NAME=salahelec
   ```

### Linux Installation

1. **Ubuntu/Debian**
   ```bash
   # Import MongoDB public GPG key
   curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

   # Add MongoDB repository
   echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

   # Update and install
   sudo apt-get update
   sudo apt-get install -y mongodb-org

   # Start MongoDB
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

2. **Update Your .env File**
   ```env
   MONGO_URI=mongodb://localhost:27017
   MONGO_DB_NAME=salahelec
   ```

---

## Testing Your Connection

After setting up MongoDB and configuring your `.env` file:

1. Start your backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. You should see:
   ```
   ✅ Connected to MongoDB
   🚀 Server running on http://localhost:5000
   ```

3. If you see connection errors, check:
   - MongoDB is running (for local installation)
   - Your connection string is correct
   - Your IP is whitelisted (for Atlas)
   - Your database user credentials are correct

---

## MongoDB Compass (Optional GUI Tool)

MongoDB Compass is a GUI tool to view and manage your database:

- **Download:** [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass)
- **Connect:** Use the same connection string from your `.env` file
- **View Data:** Browse collections, documents, and run queries visually

---

## Troubleshooting

### Connection Refused (Local MongoDB)
- Make sure MongoDB service is running
- Check if MongoDB is listening on port 27017
- Try restarting the MongoDB service

### Authentication Failed (Atlas)
- Verify your database username and password
- Check if your IP is whitelisted
- Ensure the connection string has the correct password

### Timeout Errors
- Check your internet connection (for Atlas)
- Verify firewall settings
- Check if the MongoDB port (27017) is blocked

---

## Quick Start (Recommended)

For the fastest setup, use **MongoDB Atlas**:
1. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `.env` file
5. Done! 🎉

