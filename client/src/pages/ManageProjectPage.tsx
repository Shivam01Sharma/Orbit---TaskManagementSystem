import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const ManageProjectPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await apiService.getProject(id);
        setProject(res.data);
        setName(res.data.name || '');
        setDescription(res.data.description || '');
        setStatus(res.data.status || '');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load project');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleSave = async () => {
    if (!id) return;
    setError('');
    try {
      await apiService.updateProject(id, { name, description, status });
      navigate('/projects');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update project');
    }
  };

  if (loading) return <div className="text-slate-600">Loading project...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!project) return <div className="text-slate-600">Project not found</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Manage Project: {project.name}</h1>
        <button className="px-3 py-2 rounded border" onClick={() => navigate('/projects')}>Back</button>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-4">
        <div>
          <label className="block text-sm text-slate-700 mb-1">Project Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded" />
        </div>

        <div>
          <label className="block text-sm text-slate-700 mb-1">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded" rows={4} />
        </div>

        <div>
          <label className="block text-sm text-slate-700 mb-1">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded">
            <option value="planned">Planned</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={() => navigate('/projects')} className="px-3 py-2 border rounded">Cancel</button>
          <button onClick={handleSave} className="px-3 py-2 bg-green-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default ManageProjectPage;
