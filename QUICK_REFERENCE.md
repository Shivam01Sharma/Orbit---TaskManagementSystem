# 🎯 Orbit Quick Reference Card

## 🚀 Quick Start
```bash
npm install                 # Install all dependencies
npm run dev                 # Start both servers (5173 & 5000)
```

## 🔐 Demo Credentials

### Tasker
- Email: `tasker@orbit.com`
- Password: `Tasker@123456`

### Quality Leader  
- Email: `ql@orbit.com`
- Password: `QL@123456`

### Project Leader
- Email: `pl@orbit.com`
- Password: `PL@123456`

## 🌐 URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |
| API Health | http://localhost:5000/api/health |

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Main overview |
| GETTING_STARTED.md | Step-by-step setup |
| FEATURES.md | Detailed features |
| PROJECT_SUMMARY.md | This summary |
| server/README.md | API docs |

## 🎨 Color Palette

```
Primary:    #6366F1 (Indigo)
Secondary:  #EC4899 (Pink)
Accent:     #14B8A6 (Teal)
Success:    #10B981 (Green)
Warning:    #F59E0B (Amber)
Danger:     #EF4444 (Red)
```

## 📊 Dashboard Stats

### Tasker
- Assigned, In Progress, Completed, Pending Tasks

### Quality Leader
- Team Size, Tasks Assigned, Completed, Pending

### Project Leader
- Active Projects, Total Taskers, Quality Leaders, Completed

## 🔌 Key API Endpoints

```
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/users/profile
GET    /api/projects
POST   /api/projects
GET    /api/tasks
POST   /api/tasks
GET    /api/teams
POST   /api/teams
GET    /api/dashboard/stats
```

## 👥 Roles & Permissions

### Tasker
✅ View dashboard
✅ View assigned tasks
✅ Update progress
✅ Submit tasks

### Quality Leader  
✅ Manage team (45 members)
✅ Assign tasks
✅ Approve tasks
✅ View metrics

### Project Leader
✅ Create projects
✅ Allocate resources
✅ Manage teams
✅ View all data

## 📁 Key Files

```
client/src/App.tsx          → Main app router
client/src/pages/           → Dashboards
server/src/index.ts         → API server
server/src/database.ts      → Sample data
```

## ⚙️ Configuration

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port in use | Kill process or change port |
| Can't login | Check backend is running |
| API errors | Check CORS and token |
| Build errors | Clear node_modules, reinstall |

## 📦 Installation Alternatives

### Unix/Mac
```bash
bash setup.sh
```

### Windows
```bash
setup.bat
```

### Manual
```bash
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..
```

## 🎯 First Actions

1. **Login** with demo account
2. **View Dashboard** - Explore statistics
3. **Check Tasks** - See sample tasks
4. **Review Project** - CloudSync Migration
5. **Explore Features** - Try each role

## 📞 Help Resources

- Check README.md for overview
- Read GETTING_STARTED.md for setup
- Review FEATURES.md for capabilities
- Check server/README.md for API

## 🚀 Development Commands

```bash
npm run dev          # Start all servers
npm run build        # Build for production
npm run lint         # Run linter
npm start            # Start production
```

## 💡 Pro Tips

✨ Use browser DevTools to inspect
✨ Check Network tab for API calls
✨ React DevTools for state
✨ Try all 3 roles to see differences
✨ Customize colors in tailwind.config.js

## 🎉 Platform Highlights

- 500+ Tasker capacity
- 25 Quality Leaders
- 5 Project Leaders  
- Light vibrant design
- Professional UI
- Real-time stats
- Role-based access
- Full TypeScript
- Mock database included

---

**Status**: ✅ Production Ready
**Version**: 1.0.0
**Last Updated**: May 13, 2026

For more details, refer to full documentation files.
