import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '../store/dataStore';

export const TeamsPage: React.FC = () => {
  const teams = useDataStore((s) => s.teams);
  const setTeams = useDataStore((s) => s.setTeams);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch teams from API if available
    const fetchTeams = async () => {
      try {
        const res = await (await import('../services/api')).default.getTeams();
        const data = res.data;
        // server returns memberCount; map to memberIds placeholder if needed
        setTeams(
          data.map((t: any) => ({
            id: t.id,
            name: t.name,
            projectId: t.projectId,
            qualityLeaderId: t.qualityLeaderId,
            memberIds: Array.from({ length: t.memberCount || 0 }, (_, i) => `T-${String(i + 1).padStart(3, '0')}`),
            createdAt: t.createdAt,
          }))
        );
      } catch (err) {
        // ignore - keep demo/load option
      }
    };

    fetchTeams();
  }, []);

  const loadDemoTeams = () => {
    const demo = [
      {
        id: 'team-1',
        name: 'Web Development Team',
        projectId: 'proj-alpha',
        qualityLeaderId: 'QL-01',
        memberIds: ['T-001', 'T-002', 'T-003', 'T-004'],
        createdAt: '2025-01-10',
      },
      {
        id: 'team-2',
        name: 'Mobile Development Team',
        projectId: 'proj-2',
        qualityLeaderId: 'QL-02',
        memberIds: ['T-005', 'T-006', 'T-007', 'T-008', 'T-009'],
        createdAt: '2025-02-01',
      },
    ];
    setTeams(demo as any);
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Teams</h1>
            <p className="text-slate-600">Organize team membership and roles</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              Back to Dashboard
            </button>
            <button
              onClick={loadDemoTeams}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
            >
              Load Demo Teams
            </button>
          </div>
        </div>

        {teams.length === 0 ? (
          <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
            <p className="text-slate-700 text-lg mb-4">No teams yet</p>
            <p className="text-slate-500 mb-6">You don't have any teams created. Create a team to assign members and projects.</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={loadDemoTeams}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
              >
                Load Demo Teams
              </button>
              <button
                onClick={() => navigate('/teams/create')}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
              >
                Create Team
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((t) => (
              <div key={t.id} className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-slate-900 font-semibold">{t.name}</h3>
                    <p className="text-slate-500 text-sm mt-1">Project: {t.projectId}</p>
                  </div>
                  <div className="text-sm text-slate-600">QL: {t.qualityLeaderId}</div>
                </div>

                <div className="mt-4">
                  <p className="text-slate-700 text-sm font-semibold mb-2">Members</p>
                  <div className="flex -space-x-2">
                    {(t.memberIds || []).slice(0, 6).map((m: string) => (
                      <div key={m} className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-semibold border-2 border-white">
                        {m.replace(/[^A-Z0-9]/g, '').slice(0,2)}
                      </div>
                    ))}
                    {t.memberIds && t.memberIds.length > 6 && (
                      <div className="w-9 h-9 rounded-full bg-gray-100 text-slate-700 flex items-center justify-center text-xs font-semibold border-2 border-white">+{t.memberIds.length - 6}</div>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                  <div>Created: {t.createdAt}</div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                      onClick={() => navigate(`/teams/${t.id}`)}
                    >
                      Manage
                    </button>
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

export default TeamsPage;
