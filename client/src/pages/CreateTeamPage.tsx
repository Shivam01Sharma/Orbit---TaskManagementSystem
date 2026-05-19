import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

export const CreateTeamPage: React.FC = () => {
  const [name, setName] = useState('');
  const [projectId, setProjectId] = useState('');
  const [qualityLeaderId, setQualityLeaderId] = useState('');
  const [memberIds, setMemberIds] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        name,
        projectId,
        qualityLeaderId,
        memberIds: memberIds.split(',').map((s) => s.trim()).filter(Boolean),
      };
      const res = await apiService.createTeam(payload);
      navigate(`/teams/${res.data.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create team');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Create Team</h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
          <div>
            <label className="block text-sm text-slate-700 mb-1">Team Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded" required />
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">Project ID</label>
            <input value={projectId} onChange={(e) => setProjectId(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded" required />
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">Quality Leader ID</label>
            <input value={qualityLeaderId} onChange={(e) => setQualityLeaderId(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded" required />
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">Member IDs (comma separated)</label>
            <input value={memberIds} onChange={(e) => setMemberIds(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded" />
          </div>

          <div className="flex gap-3 justify-end">
            <button type="button" onClick={() => navigate('/teams')} className="px-4 py-2 bg-white border border-gray-200 rounded">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">{loading ? 'Creating...' : 'Create Team'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamPage;
