import React from 'react';
import {
  IconHome as Home,
  IconFriends as Users,
  IconCalendarSmile as Calendar,
  IconDeviceTv as Video,
  IconChartBar as BarChart3,
  IconSettings as Settings,
  IconMoodX as LogOut,
  IconVaccine as Stethoscope,
  IconClipboardData as About,
  IconChevronRight,
  IconChevronLeft,
} from '@tabler/icons-react';
import {
  Link,
} from '@tanstack/react-router'

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  profile?: {
    username: string;
    displayName: string;
    bio: string;
    email: string;
  };
  store?: {
    Logo?: {
      url: string;
    };
    title: string;
  };
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const navigation = [
  { id: '', name: 'Dashboard', icon: Home },
  { id: 'patients', name: 'Patients', icon: Users },
  { id: 'appointments', name: 'Appointments', icon: Calendar },
  { id: 'video', name: 'Video Calls', icon: Video },
  { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  { id: 'about', name: 'About', icon: About },
  { id: 'settings', name: 'Settings', icon: Settings },
];


export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, profile, store, isCollapsed = false, onToggle }) => {
  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className={`flex items-center border-b border-gray-200 px-2 py-2 justify-between`}>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
            {store?.Logo?.url ? <img src={store.Logo.url} alt={store.title} /> : <Stethoscope className="w-5 h-5 text-white" />}
          </div>
          {!isCollapsed && <h1 className="text-xl font-bold text-gray-900">namaku</h1>}
        </div>
        <button
          onClick={onToggle}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <IconChevronRight className="w-5 h-5" /> : <IconChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      <nav className={`flex-1 py-6 space-y-2 transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-4'}`}>
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <Link
              to={`/portal/${item.id}`}
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`group relative flex items-center rounded-lg transition-all duration-200 ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3'} ${isActive ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              <Icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
              {!isCollapsed && item.name}
              {isCollapsed && (
                <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className={`border-t border-gray-200 transition-all duration-300 ${isCollapsed ? 'p-2' : 'p-4'}`}>
        {!isCollapsed && (
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">X</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{profile?.displayName || profile?.email}</p>
              <p className="text-xs text-gray-500">{profile?.bio || ''}</p>
            </div>
          </div>
        )}
        <button
          onClick={() => { localStorage.removeItem('namaku.auth'); window.location.href = "/"; }}
          className={`w-full flex items-center text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 ${isCollapsed ? 'justify-center p-3' : 'px-4 py-2'}`}
        >
          <LogOut className={`w-4 h-4 ${isCollapsed ? '' : 'mr-3'}`} />
          {!isCollapsed && 'Sign out'}
        </button>
      </div>
    </div>
  );
};
