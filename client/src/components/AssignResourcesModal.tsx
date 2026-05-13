import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

interface AssignResourcesModalProps {
  isOpen: boolean;
  projectId: string;
  onClose: () => void;
  onAssign: () => void;
}

export const AssignResourcesModal: React.FC<AssignResourcesModalProps> = ({
  isOpen,
  projectId,
  onClose,
  onAssign,
}) => {
  const [step, setStep] = useState<'selectQL' | 'selectTaskers'>('selectQL');
  const [qls, setQls] = useState<any[]>([]);
  const [taskers, setTaskers] = useState<any[]>([]);
  const [selectedQL, setSelectedQL] = useState<string>('');
  const [selectedTaskers, setSelectedTaskers] = useState<string[]>([]);
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  const fetchUsers = async () => {
    try {
      const usersResponse = await apiService.getUsers();
      const users = usersResponse.data || usersResponse;
      const qlList = Array.isArray(users) ? users.filter((u: any) => u.role === 'ql') : [];
      const taskerList = Array.isArray(users) ? users.filter((u: any) => u.role === 'tasker') : [];
      setQls(qlList);
      setTaskers(taskerList);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleAssignQL = async () => {
    if (!selectedQL || !teamName) {
      alert('Please select a Quality Leader and enter a team name');
      return;
    }

    try {
      setLoading(true);
      await apiService.assignQLToProject(projectId, {
        qualityLeaderId: selectedQL,
        teamName,
        taskerIds: selectedTaskers,
      });
      
      onAssign();
      handleClose();
    } catch (error) {
      console.error('Failed to assign QL:', error);
      alert('Failed to assign Quality Leader');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep('selectQL');
    setSelectedQL('');
    setSelectedTaskers([]);
    setTeamName('');
    onClose();
  };

  const toggleTasker = (taskerId: string) => {
    setSelectedTaskers((prev) =>
      prev.includes(taskerId)
        ? prev.filter((id) => id !== taskerId)
        : [...prev, taskerId]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 p-8 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Assign Resources</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        {step === 'selectQL' && (
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Quality Leader
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {qls.map((ql) => (
                  <label key={ql.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="ql"
                      value={ql.id}
                      checked={selectedQL === ql.id}
                      onChange={(e) => setSelectedQL(e.target.value)}
                      className="mr-3"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{ql.name}</p>
                      <p className="text-sm text-gray-500">{ql.email}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Name
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g., Frontend Development Team"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep('selectTaskers')}
                disabled={!selectedQL || !teamName}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next: Select Taskers
              </button>
            </div>
          </div>
        )}

        {step === 'selectTaskers' && (
          <div>
            <p className="text-gray-600 mb-4">
              Select taskers for <span className="font-semibold">{selectedQL ? qls.find(q => q.id === selectedQL)?.name : ''}</span>'s team: <span className="font-semibold">{teamName}</span>
            </p>

            <div className="space-y-2 max-h-48 overflow-y-auto mb-6">
              {taskers.map((tasker) => (
                <label key={tasker.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTaskers.includes(tasker.id)}
                    onChange={() => toggleTasker(tasker.id)}
                    className="mr-3 w-4 h-4"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{tasker.name}</p>
                    <p className="text-sm text-gray-500">{tasker.email}</p>
                  </div>
                </label>
              ))}
            </div>

            <p className="text-sm text-gray-600 mb-4">
              {selectedTaskers.length} tasker(s) selected
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setStep('selectQL')}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Back
              </button>
              <button
                onClick={handleAssignQL}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Assigning...' : 'Assign'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
