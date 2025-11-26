# SalahElec Backend API

Backend API for the SalahElec task management system built with Node.js, Express, and MongoDB.

## Features

- **Authentication**: JWT-based authentication with role-based access control (Admin/Employee)
- **Task Management**: Full CRUD operations for tasks with status tracking
- **Comments**: Add comments to tasks
- **User Management**: Admin can manage users (create, update, delete)
- **Dashboard**: Statistics and analytics for admins
- **Location Tracking**: Submit and track employee locations

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance) - See [MongoDB Setup Guide](./MONGODB_SETUP.md)
- npm or yarn

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up MongoDB:
   - **Option A (Recommended):** Use MongoDB Atlas (free cloud database)
     - Follow the guide in [MONGODB_SETUP.md](./MONGODB_SETUP.md)
     - Get your connection string from Atlas
   
   - **Option B:** Install MongoDB locally
     - Follow the guide in [MONGODB_SETUP.md](./MONGODB_SETUP.md)
     - Make sure MongoDB service is running

4. Create a `.env` file in the backend directory:
   - Copy `env.example` to `.env`
   - Update the MongoDB connection string:
   
   **For Local MongoDB:**
   ```env
   MONGO_URI=mongodb://localhost:27017
   MONGO_DB_NAME=salahelec
   ```
   
   **For MongoDB Atlas:**
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/salahelec?retryWrites=true&w=majority
   MONGO_DB_NAME=salahelec
   ```
   
   - **Important:** Generate a strong JWT_SECRET (at least 32 characters)

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user
- `GET /api/auth/me` - Get current user profile (requires auth)

### Tasks
- `GET /api/tasks` - Get all tasks (admin) or filtered tasks
- `GET /api/tasks/mine` - Get current user's tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task (requires auth)
- `PUT /api/tasks/:id` - Update task (requires auth)
- `DELETE /api/tasks/:id` - Delete task (requires admin)

### Comments
- `GET /api/comments/:taskId` - Get comments for a task
- `POST /api/comments/:taskId` - Add comment to task (requires auth)

### Users
- `GET /api/users` - Get all users (requires admin)
- `POST /api/users` - Create new user (requires admin)
- `PUT /api/users/profile` - Update own profile (requires auth)
- `PUT /api/users/:id` - Update user (requires admin)
- `DELETE /api/users/:id` - Delete user (requires admin)

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics (requires admin)

### Locations
- `POST /api/locations/submit` - Submit location (public endpoint)
- `GET /api/locations` - Get locations (requires auth)
- `GET /api/locations/latest/:employeeId` - Get latest location (requires auth)

## Project Structure

```
backend/
├── controllers/     # Request handlers
├── middleware/      # Authentication & authorization middleware
├── models/         # MongoDB models
├── routes/         # API routes
├── server.js       # Express app entry point
└── package.json    # Dependencies
```

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Role-based access control (RBAC)
- Input validation with express-validator
- CORS configuration
- Password exclusion from API responses

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment mode | development |
| `MONGO_URI` | MongoDB connection string | mongodb://localhost:27017 |
| `MONGO_DB_NAME` | Database name | salahelec |
| `JWT_SECRET` | Secret key for JWT tokens | (required) |
| `JWT_EXPIRES_IN` | JWT token expiration | 7d |
| `CLIENT_URL` | Frontend URL for CORS | http://localhost:5173 |

## Notes

- All routes except `/api/auth/login`, `/api/auth/register`, and `/api/locations/submit` require authentication
- Admin-only routes are protected with the `requireAdmin` middleware
- Passwords are automatically hashed before saving to the database
- JWT tokens are sent in the `Authorization` header as `Bearer <token>`

