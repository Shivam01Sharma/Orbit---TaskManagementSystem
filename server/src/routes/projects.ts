import { Router, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database';
import {
  authMiddleware,
  roleMiddleware,
  AuthenticatedRequest,
} from '../middleware/auth';

const router = Router();

// Get all projects (role-based filtering)
router.get('/', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const user = db.findUserById(req.user!.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  let projects;
  if (user.role === 'pl') {
    // PL sees projects they created
    projects = db.getProjectsByPL(user.id);
  } else if (user.role === 'ql') {
    // QL sees projects where they have teams
    projects = db.getProjectsByQL(user.id);
  } else {
    // Tasker sees projects where they're in a team
    projects = db.getProjectsByTasker(user.id);
  }

  // Only expose active projects in the projects tab
  projects = projects.filter((project) => project.status === 'active');

  res.json(
    projects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      status: project.status,
      startDate: project.startDate,
      endDate: project.endDate,
      createdAt: project.createdAt,
    }))
  );
});

// Get project by ID with stats
router.get('/:id', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const project = db.getProject(req.params.id);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  const teams = db.getTeamsByProject(project.id);
  const tasks = db.getTasksByProject(project.id);

  res.json({
    ...project,
    teams: teams.length,
    taskers: teams.reduce((sum, team) => sum + team.memberIds.length, 0),
    tasks: tasks.length,
    completedTasks: tasks.filter((t) => t.status === 'completed').length,
  });
});

// Create project (PL only)
router.post(
  '/',
  authMiddleware,
  roleMiddleware('pl'),
  (req: AuthenticatedRequest, res: Response) => {
    const { name, description, startDate, endDate } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Project name is required' });
    }

    const newProject = {
      id: uuidv4(),
      name,
      description: description || '',
      status: 'active' as const,
      projectLeaderId: req.user!.userId,
      startDate,
      endDate,
      createdAt: new Date().toISOString(),
    };

    const created = db.createProject(newProject);

    res.status(201).json(created);
  }
);

// Update project (PL only)
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('pl'),
  (req: AuthenticatedRequest, res: Response) => {
    const { name, description, status, endDate } = req.body;

    const updated = db.updateProject(req.params.id, {
      ...(name && { name }),
      ...(description && { description }),
      ...(status && { status }),
      ...(endDate && { endDate }),
    });

    if (!updated) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(updated);
  }
);

// Get available users for assignment (PL only)
router.get(
  '/:projectId/available-users',
  authMiddleware,
  roleMiddleware('pl'),
  (req: AuthenticatedRequest, res: Response) => {
    const qls = db.getUsersByRole('ql');
    const taskers = db.getUsersByRole('tasker');

    res.json({
      qls: qls.map((ql) => ({
        id: ql.id,
        name: ql.name,
        email: ql.email,
        role: ql.role,
      })),
      taskers: taskers.map((tasker) => ({
        id: tasker.id,
        name: tasker.name,
        email: tasker.email,
        role: tasker.role,
      })),
    });
  }
);

// Assign QL to project (PL creates team with QL) (PL only)
router.post(
  '/:projectId/assign-ql',
  authMiddleware,
  roleMiddleware('pl'),
  (req: AuthenticatedRequest, res: Response) => {
    const { qualityLeaderId, teamName, taskerIds } = req.body;

    if (!qualityLeaderId || !teamName) {
      return res
        .status(400)
        .json({ message: 'Quality Leader ID and team name are required' });
    }

    const project = db.getProject(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const ql = db.findUserById(qualityLeaderId);
    if (!ql || ql.role !== 'ql') {
      return res
        .status(400)
        .json({ message: 'Invalid Quality Leader ID' });
    }

    const newTeam = {
      id: uuidv4(),
      name: teamName,
      projectId: req.params.projectId,
      qualityLeaderId,
      memberIds: taskerIds || [],
      createdAt: new Date().toISOString(),
    };

    const created = db.createTeam(newTeam);

    res.status(201).json({
      message: 'Team created successfully',
      team: created,
    });
  }
);

// Assign taskers to team (PL or QL)
router.post(
  '/teams/:teamId/assign-taskers',
  authMiddleware,
  (req: AuthenticatedRequest, res: Response) => {
    const { taskerIds } = req.body;

    if (!taskerIds || !Array.isArray(taskerIds)) {
      return res
        .status(400)
        .json({ message: 'Tasker IDs array is required' });
    }

    const team = db.getTeam(req.params.teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check authorization (PL or QL of the team)
    if (req.user?.role !== 'pl' && req.user?.id !== team.qualityLeaderId) {
      return res
        .status(403)
        .json({ message: 'Not authorized to assign taskers to this team' });
    }

    // Add taskers to team (avoiding duplicates)
    taskerIds.forEach((taskerId: string) => {
      const tasker = db.findUserById(taskerId);
      if (tasker && tasker.role === 'tasker' && !team.memberIds.includes(taskerId)) {
        team.memberIds.push(taskerId);
      }
    });

    const updated = db.updateTeam(req.params.teamId, { memberIds: team.memberIds });

    res.json({
      message: 'Taskers assigned successfully',
      team: updated,
    });
  }
);

// Remove tasker from team (QL or PL only)
router.delete(
  '/teams/:teamId/taskers/:taskerId',
  authMiddleware,
  (req: AuthenticatedRequest, res: Response) => {
    const team = db.getTeam(req.params.teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check authorization
    if (req.user?.role !== 'pl' && req.user?.id !== team.qualityLeaderId) {
      return res
        .status(403)
        .json({ message: 'Not authorized to remove taskers from this team' });
    }

    const updated = db.removeTaskerFromTeam(
      req.params.teamId,
      req.params.taskerId
    );

    res.json({
      message: 'Tasker removed successfully',
      team: updated,
    });
  }
);

export default router;
