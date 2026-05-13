import { create } from 'zustand';
import { Project, Task, Team, DashboardStats } from '../types';

interface DataStore {
  projects: Project[];
  tasks: Task[];
  teams: Team[];
  stats: DashboardStats | null;
  setProjects: (projects: Project[]) => void;
  setTasks: (tasks: Task[]) => void;
  setTeams: (teams: Team[]) => void;
  setStats: (stats: DashboardStats) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  projects: [],
  tasks: [],
  teams: [],
  stats: null,

  setProjects: (projects: Project[]) => set({ projects }),
  setTasks: (tasks: Task[]) => set({ tasks }),
  setTeams: (teams: Team[]) => set({ teams }),
  setStats: (stats: DashboardStats) => set({ stats }),
}));
