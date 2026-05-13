import React from 'react';
import { Navbar } from '../components/Navbar';

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
    {
      id: 'first-task',
      name: 'First Steps',
      description: 'Complete your first task',
      icon: '🎯',
      unlockedAt: '2025-01-15',
    },
    {
      id: 'fifty-tasks',
      name: 'Task Master',
      description: 'Complete 50 tasks',
      icon: '🔥',
      unlockedAt: '2025-02-20',
    },
    {
      id: 'hundred-tasks',
      name: 'Century',
      description: 'Complete 100 tasks',
      icon: '💯',
      unlockedAt: '2025-03-30',
    },
    {
      id: 'perfect-accuracy',
      name: 'Perfectionist',
      description: 'Achieve 100% accuracy on 10 tasks',
      icon: '⭐',
      unlockedAt: '2025-04-05',
    },
    {
      id: 'seven-day-streak',
      name: 'On Fire',
      description: 'Maintain 7-day streak',
      icon: '🔥',
      unlockedAt: '2025-04-10',
    },
    {
      id: 'thirty-day-streak',
      name: 'Unstoppable',
      description: 'Maintain 30-day streak',
      icon: '⚡',
      unlockedAt: '2025-05-10',
    },
    {
      id: 'top-performer',
      name: 'Top Performer',
      description: 'Rank #1 on leaderboard',
      icon: '🏆',
      unlockedAt: '2025-05-13',
    },
    {
      id: 'helping-hand',
      name: 'Mentor',
      description: 'Help 5 junior taskers',
      icon: '🤝',
      progress: 3,
    },
    {
      id: 'speedrun',
      name: 'Speed Runner',
      description: 'Complete task 50% faster than average',
      icon: '⚡',
      unlockedAt: '2025-05-08',
    },
    {
      id: 'weekend-warrior',
      name: 'Weekend Warrior',
      description: 'Complete 20 tasks on weekends',
      icon: '🦸',
      progress: 12,
    },
  ];

  const levels = [
    { number: 1, name: 'Intern', icon: '📚', color: 'from-blue-500' },
    { number: 2, name: 'Junior', icon: '👶', color: 'from-green-500' },
    { number: 3, name: 'Senior', icon: '💼', color: 'from-yellow-500' },
    { number: 4, name: 'Expert', icon: '🎓', color: 'from-purple-500' },
    { number: 5, name: 'Elite', icon: '👑', color: 'from-red-500' },
  ];

  const unlockedBadges = allBadges.filter((b) => b.unlockedAt);
  const lockedBadges = allBadges.filter((b) => !b.unlockedAt);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">Tasker Levels & Badges</h1>
          <p className="text-purple-200 text-lg">Gamified progression system</p>
        </div>

        {/* Profile Overview */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 border border-white border-opacity-20 mb-12">
          <div className="flex items-center gap-8">
            {/* Profile Card */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-6xl">
                  👨‍💼
                </div>
                <div className="absolute bottom-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full w-12 h-12 flex items-center justify-center text-2xl ring-4 ring-slate-900">
                  👑
                </div>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-white mb-2">{profile.name}</h2>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                    {profile.level}
                  </span>
                  <span className="text-purple-300 text-lg ml-2">Level {profile.levelNumber}</span>
                </div>

                <div className="grid grid-cols-3 gap-6 mt-6">
                  <div>
                    <p className="text-purple-200 text-sm">Experience</p>
                    <p className="text-2xl font-bold text-white">{profile.experience.toLocaleString()}/{profile.maxExperience}</p>
                  </div>
                  <div>
                    <p className="text-purple-200 text-sm">Current Streak</p>
                    <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text">
                      {profile.streak} days 🔥
                    </p>
                  </div>
                  <div>
                    <p className="text-purple-200 text-sm">Total Tasks</p>
                    <p className="text-2xl font-bold text-white">{profile.totalTasks}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Bar */}
          <div className="mt-8 pt-8 border-t border-white border-opacity-10">
            <p className="text-white font-semibold mb-3">
              Progress to Elite Level: {profile.experience}/{profile.maxExperience} XP
            </p>
            <div className="w-full bg-white bg-opacity-10 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${(profile.experience / profile.maxExperience) * 100}%` }}
              ></div>
            </div>
            <p className="text-purple-300 text-sm mt-2">
              {profile.maxExperience - profile.experience} XP until next level milestone!
            </p>
          </div>
        </div>

        {/* Level Progression */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 border border-white border-opacity-20 mb-12">
          <h3 className="text-white font-bold text-xl mb-6">📈 Level Progression Path</h3>
          <div className="flex items-center justify-between">
            {levels.map((level, index) => (
              <div key={level.number} className="flex flex-col items-center flex-1">
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${level.color} to-transparent flex items-center justify-center text-4xl ring-4 ${
                    level.number <= profile.levelNumber ? 'ring-green-400' : 'ring-white ring-opacity-20'
                  } ${level.number < profile.levelNumber ? 'opacity-50' : ''}`}
                >
                  {level.icon}
                </div>
                <p className="text-white font-bold mt-3">{level.name}</p>
                <p className="text-purple-300 text-xs">Lv.{level.number}</p>

                {index !== levels.length - 1 && (
                  <div className="absolute w-12 h-1 bg-gradient-to-r from-white from-opacity-20 to-transparent ml-20 mt-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Badges Section */}
        <div className="space-y-12">
          {/* Unlocked Badges */}
          <div>
            <h3 className="text-white font-bold text-2xl mb-6">
              🏅 Unlocked Badges ({unlockedBadges.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {unlockedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20 text-center hover:border-opacity-40 transition cursor-pointer group"
                >
                  <div className="text-6xl mb-3 group-hover:scale-110 transition">{badge.icon}</div>
                  <h4 className="text-white font-bold">{badge.name}</h4>
                  <p className="text-purple-300 text-xs mt-2">{badge.description}</p>
                  <p className="text-green-400 text-xs mt-3">✓ Unlocked</p>
                </div>
              ))}
            </div>
          </div>

          {/* Locked Badges */}
          <div>
            <h3 className="text-white font-bold text-2xl mb-6">
              🔒 Locked Badges ({lockedBadges.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {lockedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-white bg-opacity-5 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-10 text-center opacity-60 hover:opacity-80 transition"
                >
                  <div className="text-6xl mb-3 grayscale">{badge.icon}</div>
                  <h4 className="text-white font-bold">{badge.name}</h4>
                  <p className="text-purple-300 text-xs mt-2">{badge.description}</p>
                  {badge.progress !== undefined && (
                    <div className="mt-3">
                      <div className="w-full bg-white bg-opacity-10 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full rounded-full"
                          style={{ width: `${(badge.progress / 5) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-yellow-400 text-xs mt-2">
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
