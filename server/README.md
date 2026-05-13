# Orbit Server

Backend API for the Orbit Task Management Platform.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

The server will run on `http://localhost:5000`

## Build

```bash
npm run build
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/register` - Register new user
- `GET /api/auth/verify` - Verify token

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/:id` - Get user by ID
- `GET /api/users` - Get all users (with optional role filter)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project details
- `POST /api/projects` - Create project (PL only)
- `PUT /api/projects/:id` - Update project (PL only)

### Tasks
- `GET /api/tasks` - Get user's tasks
- `GET /api/tasks/:id` - Get task details
- `POST /api/tasks` - Create task (QL/PL only)
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/status` - Update task status

### Teams
- `GET /api/teams` - Get all teams
- `GET /api/teams/:id` - Get team details
- `GET /api/teams/:id/members` - Get team members
- `POST /api/teams` - Create team (PL only)
- `PUT /api/teams/:id` - Update team

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/project/:projectId/stats` - Get project statistics

## Authentication

Include JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## Demo Credentials

- **Tasker**: tasker@orbit.com / Tasker@123456
- **Quality Leader**: ql@orbit.com / QL@123456
- **Project Leader**: pl@orbit.com / PL@123456
