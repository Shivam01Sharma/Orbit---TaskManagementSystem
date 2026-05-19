import React from 'react';
// Page rendered inside DashboardLayout; no top Navbar here.

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress?: number;
}

interface TaskerProfile {
  name: string;
  level: string;
  levelNumber: number;
  experience: number;
  maxExperience: number;
  streak: number;
  totalTasks: number;
}

export const GamificationPage: React.FC = () => {
  const profile: TaskerProfile = {
    name: 'Ribhav Kumar',
    level: 'Elite',
    levelNumber: 5,
    experience: 8500,
    maxExperience: 10000,
    streak: 30,
    totalTasks: 156,
  };

  const allBadges: Badge[] = [
    { id: 'first-task', name: 'First Steps', description: 'Complete your first task' },
    { id: 'fifty-tasks', name: 'Task Master', description: 'Complete 50 tasks' },
    { id: 'hundred-tasks', name: 'Century', description: 'Complete 100 tasks' },
    { id: 'perfect-accuracy', name: 'Perfectionist', description: 'Achieve 100% accuracy on 10 tasks' },
    { id: 'seven-day-streak', name: 'Consistent Performer', description: 'Maintain 7-day streak' },
    { id: 'thirty-day-streak', name: 'Unstoppable', description: 'Maintain 30-day streak' },
    { id: 'top-performer', name: 'Top Performer', description: 'Rank #1 on leaderboard' },
    { id: 'helping-hand', name: 'Mentor', description: 'Help 5 junior taskers', progress: 3 },
    { id: 'speedrun', name: 'Speed Runner', description: 'Complete task 50% faster than average' },
    { id: 'weekend-warrior', name: 'Weekend Warrior', description: 'Complete 20 tasks on weekends', progress: 12 },
  ];

  const levels = [
    { number: 1, name: 'Intern', color: 'from-blue-500' },
    { number: 2, name: 'Junior', color: 'from-green-500' },
    { number: 3, name: 'Senior', color: 'from-yellow-500' },
    { number: 4, name: 'Expert', color: 'from-purple-500' },
    { number: 5, name: 'Elite', color: 'from-red-500' },
  ];

  const unlockedBadges = allBadges.filter((b) => b.unlockedAt);
  const lockedBadges = allBadges.filter((b) => !b.unlockedAt);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Tasker Levels & Badges</h1>
          <p className="text-slate-600">Gamified progression system</p>
        </div>

        {/* Profile Overview */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 mb-8 shadow-sm">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-slate-700 flex items-center justify-center text-2xl font-bold text-white">
                  {profile.name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase()}
                </div>
                <div className="absolute bottom-0 right-0 bg-yellow-400 rounded-full w-10 h-10 flex items-center justify-center text-white ring-4 ring-white">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l3 6 6 .5-4.5 3.5L18 20l-6-3-6 3 .5-7L3 8.5 9 8l3-6z" fill="currentColor" />
                  </svg>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">{profile.name}</h2>
                <div className="mb-4">
                  <span className="text-lg font-bold text-slate-900">{profile.level}</span>
                  <span className="text-slate-500 text-sm ml-2">Level {profile.levelNumber}</span>
                </div>

                <div className="grid grid-cols-3 gap-6 mt-4">
                  <div>
                    <p className="text-slate-500 text-sm">Experience</p>
                    <p className="text-xl font-bold text-slate-900">{profile.experience.toLocaleString()}/{profile.maxExperience}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Current Streak</p>
                    <p className="text-xl font-bold text-slate-900">{profile.streak} days</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Total Tasks</p>
                    <p className="text-xl font-bold text-slate-900">{profile.totalTasks}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Bar */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-slate-700 font-semibold mb-2">
              Progress to Elite Level: {profile.experience}/{profile.maxExperience} XP
            </p>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-green-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${(profile.experience / profile.maxExperience) * 100}%` }}
              ></div>
            </div>
            <p className="text-slate-500 text-sm mt-2">
              {profile.maxExperience - profile.experience} XP until next level milestone!
            </p>
          </div>
        </div>

        {/* Level Progression */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 mb-8 shadow-sm">
          <h3 className="text-slate-900 font-bold text-lg mb-4">Level Progression Path</h3>
          <div className="flex items-center justify-between">
            {levels.map((level, index) => (
              <div key={level.number} className="flex flex-col items-center flex-1">
                <div
                  className={`w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-4xl ring-4 ${
                    level.number <= profile.levelNumber ? 'ring-green-400' : 'ring-gray-200'
                  } ${level.number < profile.levelNumber ? 'opacity-60' : ''}`}
                >
                  {level.number}
                </div>
                <p className="text-slate-900 font-bold mt-3">{level.name}</p>
                <p className="text-slate-500 text-xs">Lv.{level.number}</p>

                {index !== levels.length - 1 && (
                  <div className="absolute w-12 h-1 bg-gray-200 ml-20 mt-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Badges Section */}
        <div className="space-y-8">
          {/* Unlocked Badges */}
          <div>
            <h3 className="text-slate-900 font-bold text-xl mb-4">Unlocked Badges ({unlockedBadges.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {unlockedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-white rounded-xl p-4 border border-gray-100 text-center shadow-sm cursor-pointer group"
                >
                  <div className="mb-3 group-hover:scale-110 transition inline-flex justify-center">
                    <svg className="w-10 h-10 text-yellow-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2l3 6 6 .5-4.5 3.5L18 20l-6-3-6 3 .5-7L3 8.5 9 8l3-6z" fill="currentColor" />
                    </svg>
                  </div>
                  <h4 className="text-slate-900 font-bold">{badge.name}</h4>
                  <p className="text-slate-500 text-xs mt-2">{badge.description}</p>
                  <p className="text-green-600 text-xs mt-3">✓ Unlocked</p>
                </div>
              ))}
            </div>
          </div>

          {/* Locked Badges */}
          <div>
            <h3 className="text-slate-900 font-bold text-xl mb-4">Locked Badges ({lockedBadges.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {lockedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-white rounded-xl p-4 border border-gray-100 text-center opacity-70 hover:opacity-90 transition"
                >
                  <div className="text-6xl mb-3 inline-flex justify-center">
                    <svg className="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2l3 6 6 .5-4.5 3.5L18 20l-6-3-6 3 .5-7L3 8.5 9 8l3-6z" fill="currentColor" />
                    </svg>
                  </div>
                  <h4 className="text-slate-900 font-bold">{badge.name}</h4>
                  <p className="text-slate-500 text-xs mt-2">{badge.description}</p>
                  {badge.progress !== undefined && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-yellow-500 h-full rounded-full"
                          style={{ width: `${(badge.progress / 5) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-yellow-600 text-xs mt-2">
                        {badge.progress}/5 - {Math.round((badge.progress / 5) * 100)}%
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
