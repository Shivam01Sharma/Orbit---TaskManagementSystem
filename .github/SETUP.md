# Orbit - Professional Task Management Platform 🚀

A comprehensive, modern task management system built with React + TypeScript + Tailwind CSS (Frontend) and Express.js + Node.js (Backend).

## Quick Start

### Prerequisites
- Node.js v16 or higher
- npm or yarn

### Installation

1. **Clone and Navigate**
   ```bash
   cd orbit2
   ```

2. **Install Dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client && npm install && cd ..
   
   # Install server dependencies
   cd server && npm install && cd ..
   ```

3. **Start Development Servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Tasker | tasker@orbit.com | Tasker@123456 |
| Quality Leader (QL) | ql@orbit.com | QL@123456 |
| Project Leader (PL) | pl@orbit.com | PL@123456 |

## Features

### 🎯 Three Role-Based Access
- **Taskers**: View and update assigned tasks, track progress
- **Quality Leaders**: Assign tasks, manage team members, oversee quality
- **Project Leaders**: Manage projects, allocate teams, system oversight

### 📊 Dashboard & Analytics
- Real-time statistics for each role
- Progress tracking and completion metrics
- Team performance indicators
- Project overview

### 👥 Team Management
- Dynamic team allocation
- Member assignment
- Team performance metrics
- Hierarchy management (PL → QL → Taskers)

### 📝 Task Management
- Task creation with priority levels
- Status tracking (Pending, In Progress, Review, Completed)
- Progress percentage tracking
- Quality verification workflow

### 🏢 Project Management
- Multi-project support
- Project status tracking
- Resource allocation
- Timeline management

## Project Structure

```
orbit2/
├── client/                  # React + TypeScript Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Role-based dashboard pages
│   │   ├── services/       # API client
│   │   ├── store/          # State management (Zustand)
│   │   ├── types/          # TypeScript interfaces
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Entry point
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── server/                  # Express.js Backend
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── middleware/     # Auth & validation
│   │   ├── database.ts     # Mock database
│   │   └── index.ts        # Server entry
│   ├── package.json
│   └── tsconfig.json
│
├── README.md
└── package.json
```

## Technology Stack

### Frontend
- **React 18**: UI library
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool
- **Tailwind CSS**: Utility-first styling
- **Zustand**: State management
- **Axios**: HTTP client
- **React Router**: Navigation

### Backend
- **Express.js**: Web framework
- **Node.js**: Runtime
- **TypeScript**: Type safety
- **JWT**: Authentication
- **bcryptjs**: Password hashing

## Color Palette

| Color | Value | Usage |
|-------|-------|-------|
| Primary | #6366F1 | Main actions, headers |
| Secondary | #EC4899 | Highlights, accents |
| Accent | #14B8A6 | Tertiary actions |
| Success | #10B981 | Success states |
| Warning | #F59E0B | Warnings |
| Danger | #EF4444 | Errors |

## API Endpoints

### Authentication
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/verify`

### Users
- `GET /api/users/profile`
- `PUT /api/users/profile`
- `GET /api/users/:id`
- `GET /api/users`

### Projects
- `GET /api/projects`
- `GET /api/projects/:id`
- `POST /api/projects` (PL only)
- `PUT /api/projects/:id` (PL only)

### Tasks
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `POST /api/tasks` (QL/PL only)
- `PUT /api/tasks/:id`
- `PATCH /api/tasks/:id/status`

### Teams
- `GET /api/teams`
- `GET /api/teams/:id`
- `GET /api/teams/:id/members`
- `POST /api/teams` (PL only)
- `PUT /api/teams/:id`

### Dashboard
- `GET /api/dashboard/stats`
- `GET /api/dashboard/project/:projectId/stats`

## Development

### Frontend Development
```bash
cd client
npm run dev
```

### Backend Development
```bash
cd server
npm run dev
```

### Build for Production
```bash
npm run build
```

## Features Showcase

### For Taskers
✅ View personal dashboard
✅ Track assigned tasks
✅ Update task progress
✅ View project information
✅ Access work history

### For Quality Leaders
✅ Manage team members
✅ Assign tasks
✅ Monitor team performance
✅ Track task completion
✅ Quality verification

### For Project Leaders
✅ Create and manage projects
✅ Allocate projects to QLS
✅ Assign taskers to QLS
✅ View organization metrics
✅ System-wide monitoring

## Current Capacity
- **500+** Taskers
- **25** Quality Leaders
- **5** Project Leaders
- **Multiple** Active Projects
- **Unlimited** Tasks & Teams

## Sample Project
**"CloudSync Migration 2026"**
- Status: Active
- Taskers: 45
- Quality Leaders: 3
- Completion: 65%

## Future Enhancements
- Real-time notifications (WebSockets)
- Advanced analytics dashboard
- Machine learning recommendations
- Mobile app (React Native)
- Third-party integrations
- Performance analytics
- Automated workflows
- Team collaboration chat

## Best Practices

1. **Authentication**: Always use JWT tokens in Authorization header
2. **Role-Based Access**: Use role middleware for protected routes
3. **Error Handling**: Comprehensive error messages and status codes
4. **State Management**: Zustand for global state
5. **Styling**: Tailwind CSS utility classes
6. **Components**: Reusable and composable
7. **TypeScript**: Full type safety across project

## Performance Optimizations
- Code splitting with React Router
- Lazy loading components
- Optimized re-renders with Zustand
- CSS minification with Tailwind
- API response caching
- Efficient state updates

## Security Features
- JWT authentication
- Role-based access control (RBAC)
- Password hashing (bcryptjs)
- CORS protection
- Request validation
- Session management

## Troubleshooting

### Port Already in Use
```bash
# Frontend (change in vite.config.ts)
# Backend (change PORT in .env)
```

### Database Errors
Clear and restart server - uses in-memory mock database

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## License

ISC

## Support & Contact

For questions and support, please contact the development team or check the documentation.

---

**🚀 Elevating Team Productivity with Orbit**

Built with ❤️ for modern teams and enterprise collaboration.
