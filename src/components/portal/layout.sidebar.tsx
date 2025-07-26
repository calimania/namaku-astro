import React from 'react';
import {
  IconHome as Home,
  IconFriends as Users,
  IconCalendarSmile as Calendar,
  IconDeviceTv as Video,
  IconChartBar as BarChart3,
  IconSettings as Settings,
  IconMoodX as LogOut,
  IconVaccine as Stethoscope
} from '@tabler/icons-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  profile?: {
    username: string;
    displayName: string;
    bio: string;
    email: string;
  },
  store?: {
    Logo?: {
      url: string;
    },
    title: string;
  }
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: Home },
  { id: 'patients', name: 'Patients', icon: Users },
  { id: 'appointments', name: 'Appointments', icon: Calendar },
  { id: 'video', name: 'Video Calls', icon: Video },
  { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, profile, store }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="flex items-center px-6 py-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
            {store?.Logo?.url ? <img src={store.Logo.url} alt={store.title} /> :<Stethoscope className="w-5 h-5 text-white" />}
          </div>
          <h1 className="text-xl font-bold text-gray-900">namaku</h1>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={
                `w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600': 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">X</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{profile?.displayName || profile?.email}</p>
            <p className="text-xs text-gray-500">{profile?.bio || ''}</p>
          </div>
        </div>
        <button onClick={() => { localStorage.removeItem('namaku.auth'); window.location.href="/"; }} className="w-full flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
          <LogOut className="w-4 h-4 mr-3" />
          Sign out
        </button>
      </div>
    </div>
  );
};
