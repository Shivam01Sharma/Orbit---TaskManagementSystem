export interface User {
  id: string;
  name: string;
  email: string;
  role: 'tasker' | 'ql' | 'pl';
  avatar?: string;
  department?: string;
  joinDate: string;
  profileImage?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'paused';
  startDate: string;
  endDate?: string;
  projectLeaderId: string;
  taskersCount: number;
  qlCount: number;
  completionPercentage: number;
  tasks: Task[];
  teams: Team[];
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
  classification?: string;
  qualityCheckStatus?: 'pending' | 'approved' | 'rejected';
}

export interface Team {
  id: string;
  name: string;
  projectId: string;
  qualityLeaderId: string;
  membersCount: number;
  members: User[];
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  pendingTasks: number;
  taskersCount: number;
  projectsCount: number;
  teamSize: number;
}
