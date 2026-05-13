import { v4 as uuidv4 } from 'uuid';
import bcryptjs from 'bcryptjs';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'tasker' | 'ql' | 'pl';
  password: string;
  joinDate: string;
  lastLogin?: string;
  profileImage?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'paused';
  projectLeaderId: string;
  startDate: string;
  endDate?: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assignedTo: string;
  assignedBy: string;
  status: 'pending' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate: string;
  createdAt: string;
  completionPercentage: number;
  qualityCheckStatus?: 'pending' | 'approved' | 'rejected';
}

export interface Team {
  id: string;
  name: string;
  projectId: string;
  qualityLeaderId: string;
  memberIds: string[];
  createdAt: string;
}

// Mock Database
export class MockDatabase {
  private users: Map<string, User> = new Map();
  private projects: Map<string, Project> = new Map();
  private tasks: Map<string, Task> = new Map();
  private teams: Map<string, Team> = new Map();
  private refreshTokens: Set<string> = new Set();
  private userIdCounters = { tasker: 0, ql: 0, pl: 0 };

  constructor() {
    this.initializeDataSync();
  }

  // Generate sequential user IDs
  private generateUserId(role: 'tasker' | 'ql' | 'pl'): string {
    this.userIdCounters[role]++;
    if (role === 'tasker') {
      return `T-${String(this.userIdCounters.tasker).padStart(3, '0')}`;
    } else if (role === 'ql') {
      return `QL-${String(this.userIdCounters.ql).padStart(2, '0')}`;
    } else {
      return `PL-${this.userIdCounters.pl}`;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcryptjs.hash(password, 10);
  }

  private async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return bcryptjs.compare(password, hash);
  }

  private initializeDataSync() {
    // Use pre-hashed password: '$2a$10$...' is bcrypt hash of 'Password@123456'
    const hashedPassword = bcryptjs.hashSync('Password@123456', 10);
    
    // Create sample users - Only the required users
    const userConfigs = [
      // Project Leader (PL-1)
      { name: 'Mayank', email: 'mayank@orbit.com', role: 'pl' as const },
      // Quality Leaders (QL-01, QL-02)
      { name: 'Shivam', email: 'shivam@orbit.com', role: 'ql' as const },
      { name: 'Lakshya', email: 'lakshya@orbit.com', role: 'ql' as const },
      // Taskers (T-001 through T-009)
      { name: 'Ribhav', email: 'ribhav@orbit.com', role: 'tasker' as const },
      { name: 'Yodi', email: 'yodi@orbit.com', role: 'tasker' as const },
      { name: 'Arun', email: 'arun@orbit.com', role: 'tasker' as const },
      { name: 'Vandita', email: 'vandita@orbit.com', role: 'tasker' as const },
      { name: 'Divya', email: 'divya@orbit.com', role: 'tasker' as const },
      { name: 'Priyanshu', email: 'priyanshu@orbit.com', role: 'tasker' as const },
      { name: 'Jatin', email: 'jatin@orbit.com', role: 'tasker' as const },
      { name: 'Megha', email: 'megha@orbit.com', role: 'tasker' as const },
      { name: 'Kush', email: 'kush@orbit.com', role: 'tasker' as const },
    ];

    const emailToId: { [key: string]: string } = {};
    const joinDates = {
      'mayank@orbit.com': '2024-01-10',
      'shivam@orbit.com': '2024-06-20',
      'lakshya@orbit.com': '2024-08-15',
      'ribhav@orbit.com': '2025-01-15',
      'yodi@orbit.com': '2025-01-20',
      'arun@orbit.com': '2025-01-25',
      'vandita@orbit.com': '2025-02-01',
      'divya@orbit.com': '2025-02-05',
      'priyanshu@orbit.com': '2025-02-10',
      'jatin@orbit.com': '2025-02-15',
      'megha@orbit.com': '2025-02-20',
      'kush@orbit.com': '2025-02-25',
    };

    const users: User[] = userConfigs.map((config) => {
      const id = this.generateUserId(config.role);
      emailToId[config.email] = id;
      return {
        id,
        name: config.name,
        email: config.email,
        role: config.role,
        password: hashedPassword,
        joinDate: joinDates[config.email as keyof typeof joinDates] || new Date().toISOString().split('T')[0],
      };
    });

    users.forEach((user) => {
      this.users.set(user.id, user);
    });

    // Helper function to get ID from email
    const getId = (email: string) => emailToId[email];

    // Create sample projects (created by Mayank - PL)
    const projects: Project[] = [
      {
        id: 'proj-alpha',
        name: 'Project Alpha — AI Data Annotation 2025',
        description: 'Large-scale data labeling and quality annotation project for AI training datasets.',
        status: 'active',
        projectLeaderId: getId('mayank@orbit.com'),
        startDate: '2025-01-01',
        endDate: '2026-06-30',
        createdAt: '2024-12-15',
      },
      {
        id: 'proj-2',
        name: 'Mobile App Development',
        description: 'Cross-platform mobile application development',
        status: 'active',
        projectLeaderId: getId('mayank@orbit.com'),
        startDate: '2025-02-01',
        endDate: '2026-08-30',
        createdAt: '2025-01-20',
      },
    ];

    projects.forEach((project) => {
      this.projects.set(project.id, project);
    });

    // Create sample tasks
    const tasks: Task[] = [
      {
        id: 'task-1',
        title: 'Database Design',
        description: 'Design and optimize database schema',
        projectId: 'proj-alpha',
        assignedTo: getId('ribhav@orbit.com'),
        assignedBy: getId('shivam@orbit.com'),
        status: 'in-progress',
        priority: 'high',
        dueDate: '2026-05-20',
        createdAt: '2026-05-01',
        completionPercentage: 75,
        qualityCheckStatus: 'pending',
      },
      {
        id: 'task-2',
        title: 'API Development',
        description: 'Develop REST APIs',
        projectId: 'proj-alpha',
        assignedTo: getId('yodi@orbit.com'),
        assignedBy: getId('shivam@orbit.com'),
        status: 'pending',
        priority: 'high',
        dueDate: '2026-05-25',
        createdAt: '2026-05-02',
        completionPercentage: 0,
        qualityCheckStatus: 'pending',
      },
      {
        id: 'task-3',
        title: 'Frontend UI Components',
        description: 'Build reusable UI components',
        projectId: 'proj-2',
        assignedTo: getId('arun@orbit.com'),
        assignedBy: getId('lakshya@orbit.com'),
        status: 'in-progress',
        priority: 'high',
        dueDate: '2026-05-22',
        createdAt: '2026-05-01',
        completionPercentage: 50,
        qualityCheckStatus: 'pending',
      },
      {
        id: 'task-4',
        title: 'Testing and QA',
        description: 'Perform comprehensive testing',
        projectId: 'proj-2',
        assignedTo: getId('vandita@orbit.com'),
        assignedBy: getId('lakshya@orbit.com'),
        status: 'pending',
        priority: 'medium',
        dueDate: '2026-05-28',
        createdAt: '2026-05-03',
        completionPercentage: 0,
        qualityCheckStatus: 'pending',
      },
    ];

    tasks.forEach((task) => {
      this.tasks.set(task.id, task);
    });

    // Create sample teams
    const teams: Team[] = [
      {
        id: 'team-1',
        name: 'Web Development Team',
        projectId: 'proj-alpha',
        qualityLeaderId: getId('shivam@orbit.com'),
        memberIds: [getId('ribhav@orbit.com'), getId('yodi@orbit.com'), getId('divya@orbit.com'), getId('priyanshu@orbit.com')],
        createdAt: '2025-01-10',
      },
      {
        id: 'team-2',
        name: 'Mobile Development Team',
        projectId: 'proj-2',
        qualityLeaderId: getId('lakshya@orbit.com'),
        memberIds: [getId('arun@orbit.com'), getId('vandita@orbit.com'), getId('jatin@orbit.com'), getId('megha@orbit.com'), getId('kush@orbit.com')],
        createdAt: '2025-02-01',
      },
    ];

    teams.forEach((team) => {
      this.teams.set(team.id, team);
    });
  }

  // User methods
  findUserByEmail(email: string): User | undefined {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return undefined;
  }

  findUserById(id: string): User | undefined {
    return this.users.get(id);
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  getUsersByRole(role: string): User[] {
    return Array.from(this.users.values()).filter((user) => user.role === role);
  }

  // Project methods
  getProject(id: string): Project | undefined {
    return this.projects.get(id);
  }

  getAllProjects(): Project[] {
    return Array.from(this.projects.values());
  }

  createProject(project: Project): Project {
    this.projects.set(project.id, project);
    return project;
  }

  updateProject(id: string, updates: Partial<Project>): Project | undefined {
    const project = this.projects.get(id);
    if (project) {
      const updated = { ...project, ...updates };
      this.projects.set(id, updated);
      return updated;
    }
    return undefined;
  }

  // Task methods
  getTask(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  getAllTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  getTasksByProject(projectId: string): Task[] {
    return Array.from(this.tasks.values()).filter(
      (task) => task.projectId === projectId
    );
  }

  getTasksByAssignee(userId: string): Task[] {
    return Array.from(this.tasks.values()).filter(
      (task) => task.assignedTo === userId
    );
  }

  createTask(task: Task): Task {
    this.tasks.set(task.id, task);
    return task;
  }

  updateTask(id: string, updates: Partial<Task>): Task | undefined {
    const task = this.tasks.get(id);
    if (task) {
      const updated = { ...task, ...updates };
      this.tasks.set(id, updated);
      return updated;
    }
    return undefined;
  }

  // Team methods
  getTeam(id: string): Team | undefined {
    return this.teams.get(id);
  }

  getAllTeams(): Team[] {
    return Array.from(this.teams.values());
  }

  getTeamsByProject(projectId: string): Team[] {
    return Array.from(this.teams.values()).filter(
      (team) => team.projectId === projectId
    );
  }

  createTeam(team: Team): Team {
    this.teams.set(team.id, team);
    return team;
  }

  updateTeam(id: string, updates: Partial<Team>): Team | undefined {
    const team = this.teams.get(id);
    if (team) {
      const updated = { ...team, ...updates };
      this.teams.set(id, updated);
      return updated;
    }
    return undefined;
  }

  // Statistics methods
  getProjectStats(projectId: string) {
    const project = this.getProject(projectId);
    const tasks = this.getTasksByProject(projectId);
    const teams = this.getTeamsByProject(projectId);

    const taskStats = {
      total: tasks.length,
      completed: tasks.filter((t) => t.status === 'completed').length,
      inProgress: tasks.filter((t) => t.status === 'in-progress').length,
      pending: tasks.filter((t) => t.status === 'pending').length,
    };

    const completionPercentage =
      tasks.length > 0
        ? Math.round(
            (taskStats.completed / tasks.length) * 100
          )
        : 0;

    return {
      project,
      taskStats,
      completionPercentage,
      teams: teams.length,
      taskers: teams.reduce((sum, team) => sum + team.memberIds.length, 0),
    };
  }

  // PL-specific methods
  getProjectsByPL(plId: string): Project[] {
    return Array.from(this.projects.values()).filter(
      (project) => project.projectLeaderId === plId
    );
  }

  // QL-specific methods
  getProjectsByQL(qlId: string): Project[] {
    const teams = this.getTeamsByQL(qlId);
    const projectIds = new Set(teams.map((team) => team.projectId));
    return Array.from(this.projects.values()).filter(
      (project) => projectIds.has(project.id)
    );
  }

  // Tasker-specific methods
  getProjectsByTasker(taskerId: string): Project[] {
    const teams = Array.from(this.teams.values()).filter((team) =>
      team.memberIds.includes(taskerId)
    );
    const projectIds = new Set(teams.map((team) => team.projectId));
    return Array.from(this.projects.values()).filter(
      (project) => projectIds.has(project.id)
    );
  }

  getTeamsByQL(qlId: string): Team[] {
    return Array.from(this.teams.values()).filter(
      (team) => team.qualityLeaderId === qlId
    );
  }

  getTasksByQL(qlId: string): Task[] {
    const teams = this.getTeamsByQL(qlId);
    const teamMemberIds = teams.flatMap((team) => team.memberIds);
    return Array.from(this.tasks.values()).filter(
      (task) => teamMemberIds.includes(task.assignedTo) || task.assignedBy === qlId
    );
  }

  // Get available taskers for a specific QL
  getAvailableTaskersForQL(qlId: string): User[] {
    return this.getUsersByRole('tasker');
  }

  // Assignment methods
  assignTaskerToTeam(teamId: string, taskerId: string): Team | undefined {
    const team = this.getTeam(teamId);
    if (team && !team.memberIds.includes(taskerId)) {
      team.memberIds.push(taskerId);
      this.teams.set(teamId, team);
    }
    return team;
  }

  removeTaskerFromTeam(teamId: string, taskerId: string): Team | undefined {
    const team = this.getTeam(teamId);
    if (team) {
      team.memberIds = team.memberIds.filter((id) => id !== taskerId);
      this.teams.set(teamId, team);
    }
    return team;
  }

  // Create user with auto-generated ID
  createUser(name: string, email: string, password: string, role: 'tasker' | 'ql' | 'pl'): User {
    const userId = this.generateUserId(role);
    const newUser: User = {
      id: userId,
      name,
      email,
      password, // Should be hashed before storing
      role,
      joinDate: new Date().toISOString().split('T')[0],
    };
    this.users.set(userId, newUser);
    return newUser;
  }
}

export const db = new MockDatabase();
