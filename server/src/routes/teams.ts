import { Router, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database';
import {
  authMiddleware,
  roleMiddleware,
  AuthenticatedRequest,
} from '../middleware/auth';

const router = Router();

// Get all teams
router.get('/', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const teams = db.getAllTeams();

  res.json(
    teams.map((team) => ({
      id: team.id,
      name: team.name,
      projectId: team.projectId,
      qualityLeaderId: team.qualityLeaderId,
      memberCount: team.memberIds.length,
      createdAt: team.createdAt,
    }))
  );
});

// Get team by ID
router.get('/:id', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const team = db.getTeam(req.params.id);

  if (!team) {
    return res.status(404).json({ message: 'Team not found' });
  }

  const members = team.memberIds.map((memberId) => {
    const user = db.findUserById(memberId);
    return user
      ? {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      : null;
  }).filter(Boolean);

  res.json({
    ...team,
    members,
  });
});

// Get team members
router.get(
  '/:id/members',
  authMiddleware,
  (req: AuthenticatedRequest, res: Response) => {
    const team = db.getTeam(req.params.id);

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const members = team.memberIds.map((memberId) => {
      const user = db.findUserById(memberId);
      const memberTasks = db.getTasksByAssignee(memberId);

      return user
        ? {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            tasksCount: memberTasks.length,
            completedTasks: memberTasks.filter(
              (t) => t.status === 'completed'
            ).length,
          }
        : null;
    }).filter(Boolean);

    res.json(members);
  }
);

// Create team (PL only)
router.post(
  '/',
  authMiddleware,
  roleMiddleware('pl'),
  (req: AuthenticatedRequest, res: Response) => {
    const { name, projectId, qualityLeaderId, memberIds } = req.body;

    if (!name || !projectId || !qualityLeaderId) {
      return res
        .status(400)
        .json({
          message:
            'Name, projectId, and qualityLeaderId are required',
        });
    }

    const newTeam = {
      id: uuidv4(),
      name,
      projectId,
      qualityLeaderId,
      memberIds: memberIds || [],
      createdAt: new Date().toISOString(),
    };

    const created = db.createTeam(newTeam);

    res.status(201).json(created);
  }
);

// Update team
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('pl', 'ql'),
  (req: AuthenticatedRequest, res: Response) => {
    const { name, memberIds } = req.body;

    const updated = db.updateTeam(req.params.id, {
      ...(name && { name }),
      ...(memberIds && { memberIds }),
    });

    if (!updated) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.json(updated);
  }
);

export default router;
