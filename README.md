# SalahElecSarl – Task, Project & Workflow Management (MERN)

SalahElecSarl is an end-to-end task, project, and workflow management platform tailored for companies that need to monitor day-to-day operations, visualize productivity, and keep every teammate aligned. It offers secure authentication, granular task tracking, admin-grade analytics, and collaborative comment threads – all wrapped inside a modern Tailwind UI inspired by premium productivity suites.

## Tech Stack

- **Frontend:** React + Vite, React Router, Context API, Tailwind CSS, Recharts, React Hot Toast
- **Backend:** Node.js, Express.js, MongoDB + Mongoose, JWT, bcrypt.js, cors, morgan
- **Shared:** Placeholder directory for future shared types/utilities

## Project Structure

```
E:\desert/
├── backend/          # Express API (controllers, models, routes, middleware)
├── frontend/         # React SPA (pages, components, contexts, services)
├── shared/           # Placeholder for shared contracts/types
└── README.md
```

### Backend Highlights
- Secure JWT authentication (register, login, profile) with bcrypt hashing
- Role-based guards (`admin`, `employee`) via reusable middleware
- REST resources for tasks, comments, users, and dashboard analytics
- Task management supports assignment, priority, status updates, deadlines, and projects
- Comment threads per task to keep discussions centralized
- Dashboard endpoint aggregates KPIs (totals, overdue, tasks per employee, upcoming deadlines)

### Frontend Highlights
- Responsive dashboard with sticky sidebar/header layout
- Auth & Task context providers for global state and API orchestration
- Admin-only dashboard & user management pages
- Task board with inline status controls, creation modal, and detail view + comments
- Profile management for employees (name/password updates)
- Toast-driven feedback across flows

## Getting Started

### 1. Prerequisites
- Node.js 18+
- npm 9+
- MongoDB 6+ running locally or in the cloud

### 2. Backend Setup
```bash
cd backend
cp env.example .env        # or create the .env manually
npm install
npm run dev                # starts nodemon on http://localhost:5000
```

Required environment variables (`env.example` includes sane defaults):
```
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://localhost:27017
MONGO_DB_NAME=salahelec
JWT_SECRET=super_secret_jwt_key
JWT_EXPIRES_IN=7d
```

### 3. Frontend Setup
```bash
cd frontend
cp env.example .env        # optional – override API base if needed
npm install
npm run dev                # launches Vite on http://localhost:5173
```

Frontend ENV variables:
```
VITE_API_URL=http://localhost:5000/api
```

### 4. Default Flow
1. Start MongoDB
2. Run backend dev server (port 5000)
3. Run frontend dev server (port 5173)
4. Create the first admin manually by calling `POST /api/users` with role `admin` (e.g., via Postman) or temporarily allow `/auth/register` to set `admin` role.
5. Log into the UI via `/login` and begin assigning tasks.

## API Overview

| Method | Route              | Description                              |
|--------|--------------------|------------------------------------------|
| POST   | `/api/auth/register` | Register employee account               |
| POST   | `/api/auth/login`    | Login and receive JWT                   |
| GET    | `/api/auth/me`       | Current profile                         |
| CRUD   | `/api/tasks`         | Admin task management                   |
| GET    | `/api/tasks/mine`    | Employee’s assignments                  |
| CRUD   | `/api/comments/:id`  | Task comments                           |
| CRUD   | `/api/users`         | Admin user management                   |
| GET    | `/api/dashboard`     | Admin KPI snapshot                      |

## Testing & Quality
- Basic validation through controller-level checks and middleware
- ESLint/TSC not configured for brevity; feel free to plug them in
- Add Jest/Supertest suites in `backend/tests` and React Testing Library in `frontend/src/__tests__` when ready

## Future Improvements
- WebSocket-powered live comments/notifications
- Granular activity logs and audit trails
- Kanban/Calendar views for tasks
- File attachments per task
- Email or push notifications for deadlines

---

Feel free to extend this foundation: add Redux Toolkit, integrate company branding, plug in role invitations, or deploy via Docker. Happy building!

