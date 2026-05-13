import { Router, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database';
import {
  authMiddleware,
  roleMiddleware,
  AuthenticatedRequest,
} from '../middleware/auth';

const router = Router();

// Get all tasks for authenticated user
router.get('/', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const { projectId, status, priority } = req.query;
  const user = db.findUserById(req.user!.userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  let tasks;

  // Filter based on user role
  if (user.role === 'tasker') {
    // Taskers see only their assigned tasks
    tasks = db.getTasksByAssignee(user.id);
  } else if (user.role === 'ql') {
    // QLs see tasks assigned to their team members only
    const teams = db.getTeamsByQL(user.id);
    const teamMemberIds = teams.flatMap((team) => team.memberIds);
    tasks = db.getAllTasks().filter(
      (task) => teamMemberIds.includes(task.assignedTo)
    );
  } else {
    // PLs see all tasks
    tasks = db.getAllTasks();
  }

  // Apply filters
  if (projectId) {
    tasks = tasks.filter((task) => task.projectId === projectId);
  }

  if (status) {
    tasks = tasks.filter((task) => task.status === status);
  }

  if (priority) {
    tasks = tasks.filter((task) => task.priority === priority);
  }

  res.json(tasks);
});

// Get task by ID
router.get('/:id', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const task = db.getTask(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json(task);
});

// Create task (QL and PL only)
router.post(
  '/',
  authMiddleware,
  roleMiddleware('ql', 'pl'),
  (req: AuthenticatedRequest, res: Response) => {
    const { title, description, projectId, assignedTo, priority, dueDate } =
      req.body;

    if (!title || !projectId || !assignedTo) {
      return res
        .status(400)
        .json({
          message: 'Title, projectId, and assignedTo are required',
        });
    }

    const user = db.findUserById(req.user!.userId);

    // If QL, check if assignedTo is in their team
    if (user?.role === 'ql') {
      const teams = db.getTeamsByQL(user.id);
      const teamMemberIds = teams.flatMap((team) => team.memberIds);
      if (!teamMemberIds.includes(assignedTo)) {
        return res
          .status(403)
          .json({ message: 'Can only assign tasks to your team members' });
      }
    }

    const newTask = {
      id: uuidv4(),
      title,
      description: description || '',
      projectId,
      assignedTo,
      assignedBy: req.user!.userId,
      status: 'pending' as const,
      priority: priority || ('medium' as const),
      dueDate: dueDate || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      completionPercentage: 0,
      qualityCheckStatus: 'pending' as const,
    };

    const created = db.createTask(newTask);

    res.status(201).json(created);
  }
);

// Update task (QL, PL, and assigned tasker)
router.put('/:id', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const task = db.getTask(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const user = db.findUserById(req.user!.userId);

  // Check permission: only task creator, assignee, or PL can update
  if (
    user?.role !== 'pl' &&
    task.assignedBy !== user?.id &&
    task.assignedTo !== user?.id
  ) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const {
    status,
    completionPercentage,
    priority,
    qualityCheckStatus,
    dueDate,
  } = req.body;

  const updated = db.updateTask(req.params.id, {
    ...(status && { status }),
    ...(completionPercentage !== undefined && { completionPercentage }),
    ...(priority && { priority }),
    ...(qualityCheckStatus && { qualityCheckStatus }),
    ...(dueDate && { dueDate }),
  });

  if (!updated) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json(updated);
});

// Update task status
router.patch('/:id/status', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const task = db.getTask(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const { status } = req.body;

  const updated = db.updateTask(req.params.id, { status });

  res.json(updated);
});

export default router;
