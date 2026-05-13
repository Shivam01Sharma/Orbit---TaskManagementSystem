import { Router, Response } from 'express';
import { db } from '../database';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Get dashboard statistics
router.get(
  '/stats',
  authMiddleware,
  (req: AuthenticatedRequest, res: Response) => {
    const user = db.findUserById(req.user!.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let stats;

    if (user.role === 'tasker') {
      const userTasks = db.getTasksByAssignee(user.id);
      stats = {
        totalTasks: userTasks.length,
        completedTasks: userTasks.filter((t) => t.status === 'completed').length,
        inProgressTasks: userTasks.filter(
          (t) => t.status === 'in-progress'
        ).length,
        pendingTasks: userTasks.filter((t) => t.status === 'pending').length,
        taskersCount: 1,
        projectsCount: new Set(userTasks.map((t) => t.projectId)).size,
        teamSize: 1,
      };
    } else if (user.role === 'ql') {
      // Get QL's teams and their tasks
      const teams = db.getTeamsByQL(user.id);
      const teamMemberIds = teams.flatMap((team) => team.memberIds);
      const teamTasks = db.getAllTasks().filter(
        (task) => teamMemberIds.includes(task.assignedTo)
      );

      stats = {
        totalTasks: teamTasks.length,
        completedTasks: teamTasks.filter(
          (t) => t.status === 'completed'
        ).length,
        inProgressTasks: teamTasks.filter(
          (t) => t.status === 'in-progress'
        ).length,
        pendingTasks: teamTasks.filter((t) => t.status === 'pending')
          .length,
        taskersCount: new Set(teamMemberIds).size,
        projectsCount: new Set(teamTasks.map((t) => t.projectId)).size,
        teamSize: teams.length,
      };
    } else {
      // PL
      const allTasks = db.getAllTasks();
      const allProjects = db.getAllProjects();
      const allTeams = db.getAllTeams();
      const allUsers = db.getAllUsers();

      const taskers = allUsers.filter((u) => u.role === 'tasker');
      const qls = allUsers.filter((u) => u.role === 'ql');

      stats = {
        totalTasks: allTasks.length,
        completedTasks: allTasks.filter((t) => t.status === 'completed').length,
        inProgressTasks: allTasks.filter(
          (t) => t.status === 'in-progress'
        ).length,
        pendingTasks: allTasks.filter((t) => t.status === 'pending').length,
        taskersCount: taskers.length,
        projectsCount: allProjects.length,
        teamSize: allTeams.length,
        qlCount: qls.length,
      };
    }

    res.json(stats);
  }
);

// Get project statistics
router.get(
  '/project/:projectId/stats',
  authMiddleware,
  (req: AuthenticatedRequest, res: Response) => {
    const stats = db.getProjectStats(req.params.projectId);

    if (!stats.project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(stats);
  }
);

// Get QL's projects and teams
router.get(
  '/ql/projects',
  authMiddleware,
  (req: AuthenticatedRequest, res: Response) => {
    const user = db.findUserById(req.user!.userId);

    if (!user || user.role !== 'ql') {
      return res
        .status(403)
        .json({ message: 'Only Quality Leaders can access this' });
    }

    const teams = db.getTeamsByQL(user.id);
    const projects = db.getAllProjects().filter((project) =>
      teams.some((team) => team.projectId === project.id)
    );

    const projectsWithTeams = projects.map((project) => {
      const projectTeams = teams.filter((team) => team.projectId === project.id);
      const tasks = db.getTasksByProject(project.id).filter((task) =>
        projectTeams.some((team) => team.memberIds.includes(task.assignedTo))
      );

      return {
        ...project,
        teams: projectTeams.map((team) => ({
          id: team.id,
          name: team.name,
          memberCount: team.memberIds.length,
          members: team.memberIds.map((id) => {
            const member = db.findUserById(id);
            return {
              id: member?.id,
              name: member?.name,
              email: member?.email,
            };
          }),
        })),
        taskCount: tasks.length,
        completedTasks: tasks.filter((t) => t.status === 'completed').length,
      };
    });

    res.json(projectsWithTeams);
  }
);

// Get QL's teams
router.get(
  '/ql/teams',
  authMiddleware,
  (req: AuthenticatedRequest, res: Response) => {
    const user = db.findUserById(req.user!.userId);

    if (!user || user.role !== 'ql') {
      return res
        .status(403)
        .json({ message: 'Only Quality Leaders can access this' });
    }

    const teams = db.getTeamsByQL(user.id);

    const teamsWithDetails = teams.map((team) => {
      const project = db.getProject(team.projectId);
      const tasks = db.getTasksByProject(team.projectId).filter((task) =>
        team.memberIds.includes(task.assignedTo)
      );

      return {
        id: team.id,
        name: team.name,
        projectId: team.projectId,
        projectName: project?.name,
        memberCount: team.memberIds.length,
        members: team.memberIds.map((id) => {
          const member = db.findUserById(id);
          const memberTasks = tasks.filter((task) => task.assignedTo === id);
          return {
            id: member?.id,
            name: member?.name,
            email: member?.email,
            assignedTasks: memberTasks.length,
            completedTasks: memberTasks.filter(
              (t) => t.status === 'completed'
            ).length,
          };
        }),
        taskCount: tasks.length,
        completedTasks: tasks.filter((t) => t.status === 'completed').length,
      };
    });

    res.json(teamsWithDetails);
  }
);

export default router;
