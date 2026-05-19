import React, { useState } from 'react';
// Layout: pages are rendered inside DashboardLayout which provides sidebar.

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
    { id: 'company', name: 'Company Announcements', type: 'announcement', icon: '', unread: 3, lastMessage: 'New leaderboard launched!' },
    { id: 'alpha', name: 'Project Alpha Team', type: 'project', icon: '', unread: 5, lastMessage: 'Deadline moved to...' },
    { id: 'mobile', name: 'Mobile App Team', type: 'project', icon: '', unread: 0, lastMessage: 'Code review completed' },
    { id: 'data', name: 'Data Pipeline Team', type: 'team', icon: '', unread: 2, lastMessage: 'New batch ready' },
  ];

  const messages: Message[] = [
    {
      id: '1',
      sender: 'Mayank (PL)',
      avatar: '',
      text: 'Great work everyone! Project Alpha is on track. Keep up the momentum!',
      timestamp: '10:30 AM',
      read: true,
    },
    {
      id: '2',
      sender: 'Shivam (QL)',
      avatar: '',
      text: 'We have a new batch of 500 images ready for annotation.',
      timestamp: '11:15 AM',
      read: true,
    },
    {
      id: '3',
      sender: 'Ribhav Kumar',
      avatar: '',
      text: 'Thanks! I can start on this immediately.',
      timestamp: '11:20 AM',
      read: true,
    },
    {
      id: '4',
      sender: 'Divya Sharma',
      avatar: '',
      text: 'Completed my part of the annotation. Accuracy: 98.5%',
      timestamp: '2:45 PM',
      read: false,
    },
  ];

  const renderChannelIcon = (type: Channel['type']) => {
    switch (type) {
      case 'announcement':
        return (
          <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2c-1.1 0-2 .9-2 2v1.1C7.7 6.3 6 9.5 6 13v5l-2 2v1h16v-1l-2-2v-5c0-3.5-1.7-6.7-4-7.9V4c0-1.1-.9-2-2-2z" fill="currentColor" />
          </svg>
        );
      case 'project':
        return (
          <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 13h8V3H3v10zM13 21h8V11h-8v10z" fill="currentColor" />
          </svg>
        );
      case 'team':
      default:
        return (
          <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3z" fill="currentColor" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Team Chat & Announcements</h1>
          <p className="text-slate-600 text-lg">Real-time communication with your team</p>
        </div>

        <div className="flex flex-1 gap-6 overflow-hidden">
          {/* Channels Sidebar */}
          <div className="w-72 bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <input
                type="text"
                placeholder="Search channels..."
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 text-sm"
              />
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-2 space-y-1">
                <div className="px-3 py-1 text-xs font-semibold text-slate-500 uppercase">Channels</div>
                {channels.map((channel) => (
                  <div
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedChannel === channel.id
                        ? 'bg-slate-100'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                          <span className="text-lg text-slate-700">{renderChannelIcon(channel.type)}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-slate-900 font-semibold text-sm truncate">{channel.name}</p>
                            <p className="text-slate-500 text-xs truncate">{channel.lastMessage}</p>
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
            <div className="p-4 border-t border-gray-100">
              <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition text-sm">
                + New Channel
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-slate-900 font-bold text-lg">
                  {channels.find((c) => c.id === selectedChannel)?.name}
                </h2>
                <p className="text-slate-500 text-xs">
                  {channels.find((c) => c.id === selectedChannel)?.type === 'announcement'
                    ? 'Company-wide announcements'
                    : (Math.floor(Math.random() * 20) + 5) + ' members'}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="bg-gray-50 text-slate-700 p-2 rounded-lg hover:bg-gray-100 transition flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2v2H3v2h3v2h2V6h3V4H8V2H6zM13 7h8v2h-8V7zm0 4h8v2h-8v-2zm0 4h8v2h-8v-2z" fill="currentColor"/></svg>
                  Pin
                </button>
                <button className="bg-gray-50 text-slate-700 p-2 rounded-lg hover:bg-gray-100 transition flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8a4 4 0 100 8 4 4 0 000-8zm8 8v2h-16v-2a6 6 0 0116 0zM12 2a2 2 0 012 2v2h-4V4a2 2 0 012-2z" fill="currentColor"/></svg>
                  Info
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
              {messages.map((message) => {
                const initials = message.sender
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase();
                return (
                  <div key={message.id} className="flex gap-3 animate-fadeIn">
                    <div className="w-10 h-10 rounded-full bg-slate-700 text-white flex items-center justify-center font-semibold flex-shrink-0">{initials}</div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-slate-900 font-semibold">{message.sender}</span>
                        <span className="text-slate-500 text-xs">{message.timestamp}</span>
                        {!message.read && <span className="text-green-500 text-xs">●</span>}
                      </div>
                      <p className="text-slate-800 mt-1 bg-gray-50 p-3 rounded-lg border border-gray-100">{message.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100 space-y-3 bg-white">
              <div className="flex gap-2">
                <button className="text-slate-700 p-2 rounded-lg transition" title="Attach file">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.44 11.05l-8.49 8.49a5.5 5.5 0 11-7.78-7.78l7.78-7.78a3.5 3.5 0 014.95 4.95l-7.07 7.07a1.5 1.5 0 01-2.12-2.12l6.36-6.36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button className="text-slate-700 p-2 rounded-lg transition" title="Emoji">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-3.5 9a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm7 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-7.25 4.5a5.5 5.5 0 009.5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button className="text-slate-700 p-2 rounded-lg transition" title="Attach photo">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14l4-4 2 2 4-4 4 4 4-4z" fill="currentColor"/></svg>
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
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
