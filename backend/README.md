# SalahElecSarl Backend API

Backend API for SalahElecSarl task & workflow platform.

## Features

- User authentication and authorization
- Task management system
- Role-based access control (admin, employee)
- Project tracking
- MongoDB database integration

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/salah_sarl
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=votre_cle_secrete_ici
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:5173
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/mine` - Get current user's tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task (admin only)
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task (admin only)

## Deployment

This project can be deployed on Railway. Follow these steps:

1. Connect your repository to Railway
2. Set the environment variables in Railway dashboard:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Your JWT secret key
   - `NODE_ENV` - Set to `production`
   - `CLIENT_URL` - Your frontend URL
3. Deploy!

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed the database with initial data
