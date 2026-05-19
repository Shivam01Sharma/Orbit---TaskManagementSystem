import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDataStore } from '../store/dataStore';
import apiService from '../services/api';

export const ProjectsPage: React.FC = () => {
  const projects = useDataStore((s) => s.projects);
  const setProjects = useDataStore((s) => s.setProjects);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectIdFilter = searchParams.get('id');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await apiService.getProjects();
        const activeProjects = (res.data || []).filter((project: any) => project.status === 'active');
        setProjects(activeProjects);
      } catch (e) {
        // ignore; demo loader available
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [setProjects]);

  const loadDemoProjects = () => {
    const demo = [
      { id: 'proj-alpha', name: 'Alpha Platform', description: 'Core platform features and API', status: 'active', progress: 64, createdAt: '2025-01-10' },
      { id: 'proj-beta', name: 'Beta Mobile', description: 'Mobile app for customers', status: 'planned', progress: 10, createdAt: '2025-02-01' },
      { id: 'proj-gamma', name: 'Gamma Analytics', description: 'Analytics and reports', status: 'active', progress: 42, createdAt: '2025-03-02' },
    ];
    setProjects(demo.filter((project) => project.status === 'active') as any);
  };

  const filtered = useMemo(() => {
    const search = query.toLowerCase();
    let base = projects.filter((p) => p.status === 'active');

    if (projectIdFilter) {
      base = base.filter((p) => p.id === projectIdFilter);
    }

    return base.filter(
      (p) => !query || (p.name || '').toLowerCase().includes(search) || (p.description || '').toLowerCase().includes(search)
    );
  }, [projects, query, projectIdFilter]);

  const statusToColor = (s: string) => {
    switch (s) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-slate-400';
      case 'on-hold': return 'bg-yellow-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
            <p className="text-slate-600">Overview of your projects and status</p>
          </div>

          <div className="flex items-center gap-3">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects..." className="px-3 py-2 border border-gray-200 rounded-md w-72" />
            <button onClick={loadDemoProjects} className="px-4 py-2 bg-white border border-gray-200 rounded-md">Load Demo</button>
          </div>
        </div>

        {loading ? (
          <div className="p-8 bg-white rounded-lg border border-gray-100 text-center">Loading projects...</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
            <p className="text-slate-700 text-lg mb-4">No projects found</p>
            <p className="text-slate-500 mb-6">PL users can create projects from the PL Dashboard &gt; Projects tab. Use Load Demo to preview the UI.</p>
            <div className="flex justify-center gap-3">
              <button onClick={loadDemoProjects} className="px-4 py-2 bg-green-600 text-white rounded-lg">Load Demo Projects</button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p: any) => (
              <div key={p.id} className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-slate-900 font-semibold">{p.name}</h3>
                    <p className="text-slate-500 text-sm mt-2 truncate">{p.description}</p>
                  </div>
                  <div className="text-sm text-slate-600">{p.status || 'unknown'}</div>
                </div>

                <div className="mt-4">
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div style={{ width: `${p.progress ?? 0}%` }} className={`h-2 ${statusToColor(p.status || '')} rounded-full transition-all`}></div>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">Progress: {p.progress ?? 0}%</div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-slate-500">Created: {p.createdAt || '—'}</div>
                  <div className="flex gap-2">
                    <button onClick={() => navigate(`/projects/${p.id}`)} className="px-3 py-1 bg-white border border-gray-200 rounded">Manage</button>
                    <button onClick={() => navigate(`/projects/${p.id}#tasks`)} className="px-3 py-1 bg-green-600 text-white rounded">Tasks</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
