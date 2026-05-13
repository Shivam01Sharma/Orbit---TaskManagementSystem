# Orbit Platform - Workflow Guide

## 🔐 New Credentials

### Project Leader
- **Name**: Mayank
- **Email**: mayank@orbit.com
- **Password**: Password@123456

### Quality Leaders
- **Name**: Shivam
- **Email**: shivam@orbit.com
- **Password**: Password@123456

- **Name**: Lakshya
- **Email**: lakshya@orbit.com
- **Password**: Password@123456

### Taskers (10 Team Members)
All with password: `Password@123456`

| Name | Email |
|------|-------|
| Ribhav | ribhav@orbit.com |
| Yodi | yodi@orbit.com |
| Arun | arun@orbit.com |
| Vandita | vandita@orbit.com |
| Divya | divya@orbit.com |
| Priyanshu | priyanshu@orbit.com |
| Jatin | jatin@orbit.com |
| Megha | megha@orbit.com |
| Kush | kush@orbit.com |

---

## 🏗️ Organizational Structure

```
Mayank (PL)
├── Project 1: Web Application Development
│   └── Team 1 (Shivam - QL)
│       ├── Ribhav (Tasker)
│       ├── Yodi (Tasker)
│       ├── Divya (Tasker)
│       └── Priyanshu (Tasker)
│
└── Project 2: Mobile App Development
    └── Team 2 (Lakshya - QL)
        ├── Arun (Tasker)
        ├── Vandita (Tasker)
        ├── Jatin (Tasker)
        ├── Megha (Tasker)
        └── Kush (Tasker)
```

---

## 📊 Workflow & Features

### Project Leader (Mayank) Can:
✅ Create new projects
✅ View all projects
✅ Assign Quality Leaders to projects
✅ Assign Taskers to teams  
✅ View all tasks across organization
✅ View complete statistics
✅ Create teams within projects

**Example Flow:**
1. Create a project
2. Click "Assign QL" to add a Quality Leader
3. Add taskers to the team
4. View all activities in dashboard

### Quality Leader (Shivam/Lakshya) Can:
✅ View their assigned projects
✅ View their teams with member details
✅ Create tasks for team members only
✅ View tasks assigned to their team
✅ Update task status and progress
✅ See team performance metrics
✅ View detailed stats for their team

**Example Flow:**
1. Login to see your projects and teams
2. Click on a project to see the team
3. Click "Assign Tasks" to create new tasks
4. Select taskers from YOUR team members only
5. Monitor task progress

### Tasker (Ribhav, Yodi, etc.) Can:
✅ View assigned tasks
✅ Update task progress
✅ View task details
✅ See dashboard with personal stats
✅ Update task completion percentage
✅ Submit task for review

**Example Flow:**
1. Login to see your assigned tasks
2. Click on a task to view details
3. Update "Completion %"
4. Change status to "in-progress"
5. When done, update status to "completed"

---

## 🔄 Real-Time Synchronization

The system maintains real-time sync:
- ✅ When PL creates a project, QLs see it immediately
- ✅ When QL creates a task, Tasker sees it right away
- ✅ When Tasker updates progress, QL sees it live
- ✅ Statistics update instantly
- ✅ Team assignments sync across all views
- ✅ Task status changes reflect everywhere

---

## 🛡️ Access Control Rules

### QL Can Only:
- See their assigned projects
- Create tasks for their team members
- View tasks of their team members
- Cannot see other QL's teams
- Cannot create tasks for Taskers in other QL's team

### Tasker Can Only:
- See their own assigned tasks
- Update their own tasks
- Cannot see other's tasks
- Cannot create tasks

### PL Can:
- Create and manage projects
- Assign QLs to projects
- Assign Taskers to teams
- See everything organization-wide
- View all statistics
- Create/edit teams

---

## 📋 Sample Workflow Example

### Step 1: PL Creates Project
**Login as Mayank (PL)**
1. Go to Projects tab
2. Click "Create Project"
3. Enter: "AI Development Initiative"
4. Set dates and description
5. Click Create

### Step 2: PL Assigns QL
**Still logged in as Mayank**
1. Click on the project
2. Click "Assign Quality Leader"
3. Select "Shivam"
4. Enter Team Name: "AI Core Team"
5. Select Taskers to assign (e.g., Ribhav, Yodi)
6. Click Assign

### Step 3: QL Views & Creates Tasks
**Login as Shivam (QL)**
1. Dashboard shows your projects
2. See "AI Development Initiative"
3. Click on project
4. See team: "AI Core Team" with members
5. Click "Create Task"
6. Select tasker from YOUR team only
7. Enter task details
8. Click Create

### Step 4: Tasker Works on Task
**Login as Ribhav (Tasker)**
1. See assigned task
2. Click on task
3. Update "Completion %" as you work
4. Update Status: "in-progress"
5. When done: Status → "completed"

### Step 5: QL Reviews Results
**Login as Shivam**
1. See Ribhav's task updated to 100%
2. Status shows "completed"
3. Statistics updated automatically
4. See team progress chart

---

## 📊 Dashboard Statistics

### PL Dashboard Shows:
- Total tasks (organization-wide)
- Completed tasks count
- In-progress tasks count
- Pending tasks count
- Total Taskers (10)
- Total Projects (2)
- Total Teams (2)
- Total Quality Leaders (2)

### QL Dashboard Shows:
- Total tasks (their team)
- Completed tasks count
- In-progress tasks count
- Pending tasks count
- Team member count (e.g., 4)
- Projects count (usually 1-2)
- Team size (number of teams led)

### Tasker Dashboard Shows:
- Total tasks assigned to them
- Completed tasks count
- In-progress tasks count
- Pending tasks count
- Always shows 1 for personal stats

---

## 🔌 API Endpoints

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project (PL only)
- `POST /api/projects/:projectId/assign-ql` - Assign QL to project
- `POST /api/projects/teams/:teamId/assign-taskers` - Add taskers to team

### Tasks
- `GET /api/tasks` - Get tasks (filtered by role)
- `POST /api/tasks` - Create task (QL/PL only)
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/status` - Update task status

### Teams
- `GET /api/teams` - List teams
- `POST /api/teams` - Create team (PL only)
- `GET /api/dashboard/ql/teams` - Get QL's teams

### Dashboard
- `GET /api/dashboard/stats` - Get statistics
- `GET /api/dashboard/ql/projects` - Get QL's projects
- `GET /api/dashboard/ql/teams` - Get QL's teams

---

## 🎯 Testing Checklist

### Test as PL (Mayank)
- [ ] Login with credentials
- [ ] Create a new project
- [ ] View all projects
- [ ] Assign a QL to project (create team)
- [ ] Assign taskers to team
- [ ] View organization statistics
- [ ] See all tasks across organization

### Test as QL (Shivam)
- [ ] Login with credentials
- [ ] See only your assigned projects
- [ ] View your teams
- [ ] Create a task (only for your team members)
- [ ] Verify task appears in Tasker's list
- [ ] Try to create task for other QL's member (should fail)
- [ ] View team statistics

### Test as Tasker (Ribhav)
- [ ] Login with credentials
- [ ] See only your assigned tasks
- [ ] Update task progress
- [ ] Change task status
- [ ] View personal dashboard
- [ ] Try to create a task (should not see create button)

---

## 🚀 Real-Time Testing

1. **Open 3 Browsers:**
   - Browser 1: Login as Mayank (PL)
   - Browser 2: Login as Shivam (QL)
   - Browser 3: Login as Ribhav (Tasker)

2. **Test Sync:**
   - In PL: Assign new tasker to team
   - In QL: Verify new tasker appears immediately
   - In QL: Create a task for the new tasker
   - In Tasker: Verify task appears right away

3. **Test Hierarchy:**
   - Verify QL can't see other QL's team
   - Verify Tasker sees only their tasks
   - Verify PL can see everything

---

## 💡 Pro Tips

- All data is real-time and synchronized
- Changes are instant across all connected users
- Refresh page to see latest data
- Use browser DevTools to inspect API calls
- Check Network tab to see sync happening
- Password is same for all demo accounts for easy testing

---

**Ready to test? Start with Mayank (PL) to set up the organization!**
