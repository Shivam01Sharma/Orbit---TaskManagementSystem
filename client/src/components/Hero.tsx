import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Orbit Task Management
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional task management and team assignment platform for enterprise collaboration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="p-6 bg-white rounded-lg card-shadow">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-primary-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v6h8V3h-8zM3 21h8v-6H3v6z" fill="currentColor" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Real-time Analytics</h3>
            <p className="text-gray-600">
              Track project progress, team performance, and task completion in real-time
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg card-shadow">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-secondary-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" fill="currentColor" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Team Management</h3>
            <p className="text-gray-600">
              Allocate teams, manage members, and oversee hierarchical structure
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg card-shadow">
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-accent-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l3 6 6 .5-4.5 3.5L18 20l-6-3-6 3 .5-7-4.5-3.5L9 8l3-6z" fill="currentColor" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Task Tracking</h3>
            <p className="text-gray-600">
              Assign tasks, track progress, verify quality, and manage deadlines
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
