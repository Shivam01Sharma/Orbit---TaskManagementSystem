import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const ManageTeamPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [newMemberId, setNewMemberId] = useState('');

  useEffect(() => {
    const fetchTeam = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await apiService.getTeam(id);
        setTeam(res.data);
        setName(res.data.name || '');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load team');
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, [id]);

  const handleAddMember = () => {
    if (!newMemberId) return;
    setTeam((t: any) => ({ ...t, memberIds: [...(t.memberIds || []), newMemberId] }));
    setNewMemberId('');
  };

  const handleRemove = (memberId: string) => {
    setTeam((t: any) => ({ ...t, memberIds: (t.memberIds || []).filter((m: string) => m !== memberId) }));
  };

  const handleSave = async () => {
    if (!id) return;
    setError('');
    try {
      const payload: any = { name };
      if (team?.memberIds) payload.memberIds = team.memberIds;
      await apiService.updateTeam(id, payload);
      navigate('/teams');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update team');
    }
  };

  if (loading) return <div className="text-slate-600">Loading team...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!team) return <div className="text-slate-600">Team not found</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Manage Team: {team.name}</h1>
        <button className="px-3 py-2 rounded border" onClick={() => navigate('/teams')}>Back</button>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-4">
        <div>
          <label className="block text-sm text-slate-700 mb-1">Team Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded" />
        </div>

        <div>
          <label className="block text-sm text-slate-700 mb-2">Members</label>
          <div className="space-y-2">
            {(team.memberIds || []).map((m: string) => (
              <div key={m} className="flex items-center justify-between border rounded px-3 py-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-700">{m.slice(0,2).toUpperCase()}</div>
                  <div className="text-sm text-slate-800">{m}</div>
                </div>
                <button onClick={() => handleRemove(m)} className="text-sm text-red-600">Remove</button>
              </div>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <input placeholder="Member ID" value={newMemberId} onChange={(e) => setNewMemberId(e.target.value)} className="px-3 py-2 border rounded w-full" />
            <button onClick={handleAddMember} className="px-3 py-2 bg-slate-900 text-white rounded">Add</button>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={() => navigate('/teams')} className="px-3 py-2 border rounded">Cancel</button>
          <button onClick={handleSave} className="px-3 py-2 bg-green-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default ManageTeamPage;
