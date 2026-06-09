# Smart Student Study Planer

Smart Student Study Planer is a full-stack academic planner for students to manage subjects, tasks, deadlines, and account information in one place. It uses a React frontend, an Express and MongoDB backend, JWT authentication, and account-specific data across the dashboard, subjects, tasks, and profile pages.

## Highlights

- JWT register, login, logout, and current-user session recovery
- MongoDB-backed subjects CRUD
- MongoDB-backed tasks CRUD with completion toggle
- Profile editing with persisted name, email, phone, and bio
- Dashboard with live per-account stats and upcoming deadlines
- Responsive UI with a professional blue-purple-orange theme

## Tech Stack

- Frontend: React 18, Vite, React Router, Axios, Tailwind CSS
- Backend: Node.js, Express, Mongoose, JSON Web Token, bcryptjs, CORS
- Database: MongoDB

## Project Structure

- [frontend/](frontend/)
    - [src/components/](frontend/src/components/)
    - [src/context/](frontend/src/context/)
    - [src/pages/](frontend/src/pages/)
    - [src/routes/](frontend/src/routes/)
    - [src/services/](frontend/src/services/)
- [backend/](backend/)
    - [config/](backend/config/)
    - [controllers/](backend/controllers/)
    - [middleware/](backend/middleware/)
    - [models/](backend/models/)
    - [routes/](backend/routes/)
    - [server.js](backend/server.js)

## Feature Set

### Authentication

- Register new account
- Login with email and password
- Logout
- Restore the current user from the saved JWT

### Subjects

- Create subjects with name, code, description, instructor, and credits
- Edit existing subjects
- Delete subjects
- View subject count on the dashboard and profile

### Tasks

- Create tasks linked to a subject
- Edit tasks
- Delete tasks
- Toggle completion state
- Filter tasks by all, pending, and completed
- View recent tasks and upcoming deadlines on the dashboard

### Profile

- View the logged-in account
- Edit name, email, phone, and bio
- Show live account stats from the database

## API Overview

Base URL: `http://localhost:5000/api`

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `PUT /auth/me`
- `POST /auth/logout`

### Subjects

- `GET /subjects`
- `POST /subjects`
- `GET /subjects/:id`
- `PUT /subjects/:id`
- `DELETE /subjects/:id`

### Tasks

- `GET /tasks`
- `POST /tasks`
- `GET /tasks/:id`
- `PUT /tasks/:id`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

## Screenshots

Add your own screenshots here after deploying or running the app locally.

## Setup

### Prerequisites

- Node.js 16+
- MongoDB running locally or on Atlas
- npm

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-student-study-planer
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

Run the server:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the app:

```bash
npm run dev
```

## Development Flow

1. Start MongoDB
2. Start the backend API
3. Start the frontend app
4. Register or log in
5. Manage subjects, tasks, and profile data

## Default Behavior

- The app redirects authenticated users to the dashboard
- The dashboard shows live account-specific data
- The sidebar and logo both navigate to the dashboard

## Notes

- Data is stored per account in MongoDB
- The task controller returns populated subject data so cards remain readable
- The UI is designed for local development and phase-based project review

## License

MIT
