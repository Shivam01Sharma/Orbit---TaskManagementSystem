import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';

interface Message {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  timestamp: string;
  read: boolean;
}

interface Channel {
  id: string;
  name: string;
  type: 'announcement' | 'project' | 'team';
  icon: string;
  unread: number;
  lastMessage?: string;
}

export const ChatPage: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<string>('company');
  const [messageText, setMessageText] = useState('');

  const channels: Channel[] = [
    { id: 'company', name: 'Company Announcements', type: 'announcement', icon: '📢', unread: 3, lastMessage: 'New leaderboard launched!' },
    { id: 'alpha', name: 'Project Alpha Team', type: 'project', icon: '📁', unread: 5, lastMessage: 'Deadline moved to...' },
    { id: 'mobile', name: 'Mobile App Team', type: 'project', icon: '📱', unread: 0, lastMessage: 'Code review completed' },
    { id: 'data', name: 'Data Pipeline Team', type: 'team', icon: '⚙️', unread: 2, lastMessage: 'New batch ready' },
  ];

  const messages: Message[] = [
    {
      id: '1',
      sender: 'Mayank (PL)',
      avatar: '👨‍💼',
      text: 'Great work everyone! Project Alpha is on track. Keep up the momentum!',
      timestamp: '10:30 AM',
      read: true,
    },
    {
      id: '2',
      sender: 'Shivam (QL)',
      avatar: '👥',
      text: 'We have a new batch of 500 images ready for annotation.',
      timestamp: '11:15 AM',
      read: true,
    },
    {
      id: '3',
      sender: 'Ribhav Kumar',
      avatar: '👨‍💻',
      text: 'Thanks! I can start on this immediately.',
      timestamp: '11:20 AM',
      read: true,
    },
    {
      id: '4',
      sender: 'Divya Sharma',
      avatar: '👩‍💼',
      text: 'Completed my part of the annotation. Accuracy: 98.5%',
      timestamp: '2:45 PM',
      read: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <Navbar />
        <div className="max-w-7xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-5xl font-bold text-white mb-2">Team Chat & Announcements</h1>
          <p className="text-purple-200 text-lg">Real-time communication with your team</p>
        </div>

        <div className="flex flex-1 gap-6 overflow-hidden">
          {/* Channels Sidebar */}
          <div className="w-72 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl border border-white border-opacity-20 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white border-opacity-10">
              <input
                type="text"
                placeholder="Search channels..."
                className="w-full px-3 py-2 bg-white bg-opacity-10 border border-purple-300 border-opacity-30 rounded-lg text-white placeholder-purple-300 placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-2 space-y-1">
                <div className="px-3 py-1 text-xs font-semibold text-purple-300 uppercase">Channels</div>
                {channels.map((channel) => (
                  <div
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedChannel === channel.id
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                        : 'hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{channel.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{channel.name}</p>
                        <p className="text-purple-300 text-xs truncate">{channel.lastMessage}</p>
                      </div>
                      {channel.unread > 0 && (
                        <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 font-bold">
                          {channel.unread}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-t border-white border-opacity-10">
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition text-sm">
                + New Channel
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl border border-white border-opacity-20 flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-white border-opacity-10 flex items-center justify-between">
              <div>
                <h2 className="text-white font-bold text-lg">
                  {channels.find((c) => c.id === selectedChannel)?.name}
                </h2>
                <p className="text-purple-300 text-xs">
                  {channels.find((c) => c.id === selectedChannel)?.type === 'announcement'
                    ? '📢 Company-wide announcements'
                    : '👥 ' + (Math.floor(Math.random() * 20) + 5) + ' members'}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="bg-white bg-opacity-10 text-white p-2 rounded-lg hover:bg-opacity-20 transition">
                  📌 Pin
                </button>
                <button className="bg-white bg-opacity-10 text-white p-2 rounded-lg hover:bg-opacity-20 transition">
                  ⚙️ Info
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex gap-3 animate-fadeIn">
                  <span className="text-2xl flex-shrink-0">{message.avatar}</span>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-white font-semibold">{message.sender}</span>
                      <span className="text-purple-300 text-xs">{message.timestamp}</span>
                      {!message.read && <span className="text-blue-400 text-xs">●</span>}
                    </div>
                    <p className="text-purple-100 mt-1 bg-white bg-opacity-5 p-3 rounded-lg">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white border-opacity-10 space-y-3">
              <div className="flex gap-2">
                <button className="text-white text-xl hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition">
                  📎
                </button>
                <button className="text-white text-xl hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition">
                  🎉
                </button>
                <button className="text-white text-xl hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition">
                  📸
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-white bg-opacity-10 border border-purple-300 border-opacity-30 rounded-lg text-white placeholder-purple-300 placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
