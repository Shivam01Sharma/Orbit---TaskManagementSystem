import axios, { AxiosInstance } from 'axios';

class ApiService {
  private api: AxiosInstance;
  private static instance: ApiService;

  private constructor() {
    // Use environment variable or relative path for API base URL
    // In production on Railway: uses relative /api (same origin)
    // In development: uses /api with vite proxy to localhost:5000
    const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';
    
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // Auth endpoints
  login(email: string, password: string) {
    return this.api.post('/auth/login', { email, password });
  }

  logout() {
    return this.api.post('/auth/logout');
  }

  register(name: string, email: string, password: string, role: 'tasker' | 'ql' | 'pl') {
    return this.api.post('/auth/register', { name, email, password, role });
  }

  // User endpoints
  getUserProfile() {
    return this.api.get('/users/profile');
  }

  updateUserProfile(data: any) {
    return this.api.put('/users/profile', data);
  }

  getUser(id: string) {
    return this.api.get(`/users/${id}`);
  }

  getUsers(role?: string) {
    return this.api.get('/users', { params: { role } });
  }

  // Project endpoints
  getProjects() {
    return this.api.get('/projects');
  }

  getProject(id: string) {
    return this.api.get(`/projects/${id}`);
  }

  createProject(data: any) {
    return this.api.post('/projects', data);
  }

  updateProject(id: string, data: any) {
    return this.api.put(`/projects/${id}`, data);
  }

  // Task endpoints
  getTasks(filters?: any) {
    return this.api.get('/tasks', { params: filters });
  }

  getTask(id: string) {
    return this.api.get(`/tasks/${id}`);
  }

  createTask(data: any) {
    return this.api.post('/tasks', data);
  }

  updateTask(id: string, data: any) {
    return this.api.put(`/tasks/${id}`, data);
  }

  updateTaskStatus(id: string, status: string) {
    return this.api.patch(`/tasks/${id}/status`, { status });
  }

  // Team endpoints
  getTeams() {
    return this.api.get('/teams');
  }

  getTeam(id: string) {
    return this.api.get(`/teams/${id}`);
  }

  createTeam(data: any) {
    return this.api.post('/teams', data);
  }

  getTeamMembers(teamId: string) {
    return this.api.get(`/teams/${teamId}/members`);
  }

  // Dashboard endpoints
  getDashboardStats() {
    return this.api.get('/dashboard/stats');
  }

  getProjectStats(projectId: string) {
    return this.api.get(`/dashboard/project/${projectId}/stats`);
  }

  getQLProjects() {
    return this.api.get('/dashboard/ql/projects');
  }

  getQLTeams() {
    return this.api.get('/dashboard/ql/teams');
  }

  // Assignment endpoints
  assignQLToProject(projectId: string, data: any) {
    return this.api.post(`/projects/${projectId}/assign-ql`, data);
  }

  assignTaskersToTeam(teamId: string, taskerIds: string[]) {
    return this.api.post(`/projects/teams/${teamId}/assign-taskers`, {
      taskerIds,
    });
  }

  removeTaskerFromTeam(teamId: string, taskerId: string) {
    return this.api.delete(`/projects/teams/${teamId}/taskers/${taskerId}`);
  }
}

export default ApiService.getInstance();
export const apiService = ApiService.getInstance();
