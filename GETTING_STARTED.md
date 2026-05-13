# Getting Started with Orbit 🚀

Welcome to **Orbit**, the professional task management and team assignment platform!

## 📋 Prerequisites

- **Node.js**: v16 or higher
- **npm**: v7 or higher
- **Git**: For version control
- A modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Installation Steps

### Step 1: Clone the Repository
```bash
cd orbit2
```

### Step 2: Install Root Dependencies
```bash
npm install
```

This installs concurrently for running both servers simultaneously.

### Step 3: Install Frontend Dependencies
```bash
cd client
npm install
cd ..
```

### Step 4: Install Backend Dependencies
```bash
cd server
npm install
cd ..
```

### Step 5: Configure Environment Variables

**Frontend** - `client/.env`
```
VITE_API_URL=http://localhost:5000/api
```

**Backend** - `server/.env` (already configured)
```
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

### Step 6: Start Development Servers
```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 🔐 Login to Application

Use one of these demo accounts to test different roles:

### 👤 Tasker Account
```
Email: tasker@orbit.com
Password: Tasker@123456
```
**Access**: View personal dashboard, assigned tasks, and progress tracking

### 👥 Quality Leader Account
```
Email: ql@orbit.com
Password: QL@123456
```
**Access**: Manage team members, assign tasks, quality verification

### 🎯 Project Leader Account
```
Email: pl@orbit.com
Password: PL@123456
```
**Access**: Create projects, allocate resources, system overview

## 🎯 First Steps After Login

### For Taskers
1. ✅ View your dashboard with assigned tasks
2. ✅ Check task progress and due dates
3. ✅ Update task status and completion percentage
4. ✅ Access project information
5. ✅ View your work history

### For Quality Leaders
1. ✅ View your team members (up to 100 taskers)
2. ✅ Assign new tasks to team members
3. ✅ Monitor task progress
4. ✅ Approve or reject completed tasks
5. ✅ Track team productivity metrics

### For Project Leaders
1. ✅ View all active projects
2. ✅ Create new projects
3. ✅ Allocate projects to quality leaders
4. ✅ Assign taskers to quality leaders
5. ✅ Monitor organizational metrics

## 📊 Dashboard Features

### Statistics Cards
- Real-time task counts
- Completion metrics
- Team size information
- Project progress

### Task Management
- View all assigned/created tasks
- Filter by status, priority, project
- Update progress
- Quality verification

### Team Overview
- See team members and their status
- View individual task assignments
- Monitor performance metrics
- Manage team composition

### Project Tracking
- Real-time project status
- Progress visualization
- Resource allocation
- Completion timeline

## 🔌 API Endpoints Reference

### Authentication
```
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/verify
```

### User Management
```
GET /api/users/profile
PUT /api/users/profile
GET /api/users/:id
GET /api/users?role=tasker
```

### Projects
```
GET /api/projects
GET /api/projects/:id
POST /api/projects (PL only)
PUT /api/projects/:id (PL only)
```

### Tasks
```
GET /api/tasks
GET /api/tasks/:id
POST /api/tasks (QL/PL only)
PUT /api/tasks/:id
PATCH /api/tasks/:id/status
```

### Teams
```
GET /api/teams
GET /api/teams/:id
GET /api/teams/:id/members
POST /api/teams (PL only)
PUT /api/teams/:id
```

### Dashboard
```
GET /api/dashboard/stats
GET /api/dashboard/project/:projectId/stats
```

## 🎨 UI Features

### Color Scheme
- **Primary**: Vibrant Indigo (#6366F1)
- **Secondary**: Vibrant Pink (#EC4899)
- **Accent**: Teal (#14B8A6)
- **Success**: Emerald (#10B981)
- **Warning**: Amber (#F59E0B)

### Responsive Design
- Mobile-first approach
- Tablet optimized
- Desktop enhanced
- Touch-friendly interface

### Animations
- Smooth page transitions
- Card hover effects
- Loading spinners
- Progress bar animations

## 🔧 Development Tips

### Frontend Development
```bash
cd client
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

### Backend Development
```bash
cd server
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Run compiled code
```

### API Testing
- Use Postman or Insomnia
- Base URL: http://localhost:5000/api
- Include JWT token in Authorization header

### Browser DevTools
- React Developer Tools
- Network inspection
- Console debugging
- Performance monitoring

## 📁 Project Structure

```
orbit2/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Role-based dashboards
│   │   ├── services/         # API client
│   │   ├── store/            # State management
│   │   ├── types/            # TypeScript interfaces
│   │   ├── index.css         # Global styles
│   │   ├── App.tsx           # Main component
│   │   └── main.tsx          # Entry point
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js    # Tailwind CSS config
│   ├── vite.config.ts        # Vite config
│   └── tsconfig.json
│
├── server/                    # Express Backend
│   ├── src/
│   │   ├── routes/           # API routes
│   │   │   ├── auth.ts       # Authentication
│   │   │   ├── users.ts      # User management
│   │   │   ├── projects.ts   # Project management
│   │   │   ├── tasks.ts      # Task management
│   │   │   ├── teams.ts      # Team management
│   │   │   └── dashboard.ts  # Statistics
│   │   ├── middleware/       # Custom middleware
│   │   │   └── auth.ts       # Auth middleware
│   │   ├── database.ts       # Mock database
│   │   └── index.ts          # Server entry
│   ├── dist/                 # Compiled code
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── .github/
│   ├── SETUP.md              # Setup guide
│   ├── CHECKLIST.md          # Feature checklist
│   └── copilot-instructions.md
│
├── .gitignore
├── README.md                 # Main documentation
└── package.json              # Root package
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 5173 or 5000
lsof -i :5173  # Frontend
lsof -i :5000  # Backend

# Kill the process
kill -9 <PID>
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Remove lock files
rm -rf package-lock.json

# Reinstall
npm install
```

### Build Errors
```bash
# Clear node_modules
rm -rf node_modules

# Reinstall from scratch
npm install
```

### API Connection Issues
- Check if backend is running on port 5000
- Verify API URL in frontend .env
- Check browser console for CORS errors
- Verify JWT token is being sent

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Express.js Guide](https://expressjs.com/)
- [Vite Documentation](https://vitejs.dev/guide/)

## 🚀 Production Deployment

### Frontend
```bash
cd client
npm run build
# Deploy dist/ folder to static hosting (Vercel, Netlify, etc.)
```

### Backend
```bash
cd server
npm run build
# Deploy dist/ folder to server (Heroku, AWS, etc.)
# Set environment variables on deployment platform
```

## 🔐 Security Checklist

- ✅ Change JWT_SECRET before production
- ✅ Enable HTTPS for all communications
- ✅ Use environment variables for sensitive data
- ✅ Implement rate limiting
- ✅ Add CSRF protection
- ✅ Validate all user inputs
- ✅ Use security headers
- ✅ Regular security audits

## 💡 Next Steps

1. ✅ Explore all three dashboards with demo accounts
2. ✅ Create a new project (as PL)
3. ✅ Create a task and assign it (as QL)
4. ✅ Update task progress (as Tasker)
5. ✅ Review statistics (as any role)
6. ✅ Customize the application
7. ✅ Connect real database
8. ✅ Deploy to production

## 📞 Support

For questions or issues:
1. Check the README files in each directory
2. Review API documentation
3. Check browser console for errors
4. Review server logs

---

**Enjoy using Orbit! 🎉**

Start managing tasks more effectively with our professional platform.
