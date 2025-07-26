import React from 'react';
import { IconSearch as Search, IconBell as  Bell, IconMessage as MessageCircle } from '@tabler/icons-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onNewAppointment?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, onNewAppointment }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search patients, appointments..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Notifications */}
          <div className="flex items-center space-x-2">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"></span>
            </button>
            <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
          </div>

          <Button size="md" onClick={onNewAppointment}>New Appointment</Button>
        </div>
      </div>
    </header>
  );
};
