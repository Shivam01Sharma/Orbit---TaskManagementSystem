# Orbit - Professional Task Management & Team Assignment Platform

A comprehensive, modern task management system designed for enterprise team coordination with role-based access control and real-time collaboration.

## 🎯 Features

### Core Features
- **Three Role-Based Access Levels**
  - **Taskers**: Execute assigned tasks with progress tracking
  - **Quality Leaders (QL)**: Manage task assignments and team oversight
  - **Project Leaders (PL)**: Manage projects and allocate teams

- **User Management**
  - Secure login/logout with daily tracking
  - 500+ Taskers, 25 Quality Leaders, 5 Project Leaders capacity
  - Comprehensive user profiles with experience history
  - Real-time user status tracking

- **Project Management**
  - Multi-project support with current technical projects display
  - Project allocation to teams
  - Task classification and assignment
  - Real-time project updates

- **Team Management**
  - Dynamic team creation and allocation
  - Team member assignment to Quality Leaders
  - Hierarchical team structure (PL → QL → Taskers)
  - Team performance metrics

- **Task Management**
  - Task creation with detailed descriptions
  - Priority-based assignment
  - Progress tracking
  - Task status monitoring
  - Quality verification workflow

### Advanced Features
- Dashboard analytics for each role
- Attendance and productivity tracking
- Task history and project records
- Professional UI with light, vibrant colors
- Real-time notifications
- Responsive design for all devices

## 🏗️ Project Architecture

```
orbit2/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Role-based pages
│   │   ├── services/         # API services
│   │   ├── context/          # Global state
│   │   ├── hooks/            # Custom hooks
│   │   ├── styles/           # Tailwind config
│   │   └── App.tsx           # Main app
│   └── package.json
├── server/                    # Express backend
│   ├── src/
│   │   ├── routes/           # API routes
│   │   ├── controllers/      # Request handlers
│   │   ├── models/           # Data models
│   │   ├── middleware/       # Auth & validation
│   │   ├── services/         # Business logic
│   │   └── index.ts          # Server entry
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

2. **Start Development Servers**
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

### Default Login Credentials

#### Quality Leader (QL)
- Email: `ql@orbit.com`
- Password: `QL@123456`

#### Project Leader (PL)
- Email: `pl@orbit.com`
- Password: `PL@123456`

#### Tasker
- Email: `tasker@orbit.com`
- Password: `Tasker@123456`

## 💡 Role Capabilities

### Tasker Dashboard
- View assigned tasks
- Update task progress
- Access project information
- View profile and work history
- Daily login/logout tracking

### Quality Leader Dashboard
- Assign tasks to taskers
- Monitor team members (up to 100 taskers per QL)
- View project details
- Track team productivity
- Manage quality checks

### Project Leader Dashboard
- Create and manage projects
- Allocate projects to Quality Leaders
- Assign taskers to Quality Leaders
- View organizational metrics
- System-wide monitoring

## 🎨 Design System

### Color Palette
- **Primary**: #6366F1 (Vibrant Indigo)
- **Secondary**: #EC4899 (Vibrant Pink)
- **Accent**: #14B8A6 (Teal)
- **Success**: #10B981 (Emerald)
- **Warning**: #F59E0B (Amber)
- **Danger**: #EF4444 (Red)
- **Background**: #F9FAFB (Light Gray)
- **Text**: #1F2937 (Dark Gray)

## 📊 Current Sample Projects

1. **"CloudSync Migration 2026"** - Infrastructure modernization project
   - Status: Active
   - Taskers: 45
   - Quality Leaders: 3
   - Completion: 65%

## 🔧 Technology Stack

### Frontend
- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **Axios**: HTTP client
- **Zustand/Context**: State management

### Backend
- **Express.js**: Web framework
- **Node.js**: Runtime
- **JWT**: Authentication
- **MongoDB/JSON**: Data storage (mock)
- **Cors**: Cross-origin support

## 📱 Responsive Features
- Mobile-friendly design
- Tablet optimization
- Desktop-first approach with responsive fallbacks
- Touch-friendly interfaces

## 🔐 Security Features
- JWT-based authentication
- Role-based access control (RBAC)
- Password hashing
- Session management
- CORS protection

## 🚀 Future Enhancements
- Real-time notifications with WebSockets
- Advanced analytics and reporting
- Machine learning for task recommendation
- Integration with third-party tools
- Mobile app (React Native)
- Advanced team collaboration features
- Performance analytics dashboard
- Automated workflow triggers

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/register` - New user registration
- `GET /api/auth/verify` - Verify token

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/:id` - Get user details

### Project Endpoints
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project (PL only)
- `GET /api/projects/:id` - Get project details

### Task Endpoints
- `GET /api/tasks` - List tasks
- `POST /api/tasks` - Create task (QL/PL)
- `PUT /api/tasks/:id` - Update task
- `GET /api/tasks/:id/status` - Get task status

### Team Endpoints
- `GET /api/teams` - List teams
- `POST /api/teams` - Create team (PL)
- `GET /api/teams/:id/members` - Get team members

## 🤝 Contributing

Guidelines for contributing to this project...

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions, please contact the development team.

---

**Orbit - Elevating Team Productivity** 🚀
