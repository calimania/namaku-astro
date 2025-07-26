
import React, { useState } from 'react';
import {
  IconCalendarWeek as Calendar, IconClock as Clock, IconDeviceTv as Video, IconAdjustmentsHorizontal as Filter, IconSearch as Search,
  IconPlus as Plus, IconChevronCompactLeft as ChevronLeft, IconChevronCompactRight as ChevronRight
} from '@tabler/icons-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { mockAppointments } from '../../data/mock';
import { type Appointment } from '../../markket/index.d';
import { formatDate, formatTime } from '../../lib/date';

export const AppointmentsList: React.FC = () => {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAppointments = mockAppointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled': return 'primary';
      case 'completed': return 'success';
      case 'cancelled': return 'danger';
      case 'no-show': return 'warning';
      default: return 'neutral';
    }
  };

  const getTypeColor = (type: Appointment['type']) => {
    switch (type) {
      case 'initial': return 'purple';
      case 'follow-up': return 'blue';
      case 'group': return 'emerald';
      case 'emergency': return 'red';
      default: return 'gray';
    }
  };

  const todayAppointments = filteredAppointments.filter(
    apt => apt.date.toDateString() === new Date().toDateString()
  );

  const upcomingAppointments = filteredAppointments.filter(
    apt => apt.date > new Date() && apt.status === 'scheduled'
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
          <p className="text-gray-600 mt-1">Manage your scheduled sessions and consultations</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Calendar
            </button>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-4">
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{todayAppointments.length}</div>
            <div className="text-sm text-gray-600">Today</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">{upcomingAppointments.length}</div>
            <div className="text-sm text-gray-600">Upcoming</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {filteredAppointments.filter(a => a.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">94%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search appointments by patient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="no-show">No Show</option>
          </select>
        </div>
      </div>

      {/* Demo Banner */}
      <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
        <div className="flex items-center space-x-3">
          <Video className="w-8 h-8 text-emerald-600" />
          <div>
            <h4 className="font-semibold text-emerald-900">Demo Mode Active</h4>
            <p className="text-sm text-emerald-700">
              All video calls are limited to 5 minutes for demonstration purposes.
              Perfect for showcasing the platform's capabilities to potential clients!
            </p>
          </div>
        </div>
      </Card>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar name={appointment.patientName} size="lg" />
                <div>
                  <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{formatDate(appointment.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{formatTime(appointment.date)} ({appointment.duration} min)</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                    <Badge variant="neutral">
                      {appointment.type}
                    </Badge>
                    {appointment.status === 'scheduled' && (
                      <div className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                        5 min demo
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {appointment.notes && (
                  <div className="max-w-xs">
                    <p className="text-sm text-gray-600 truncate">{appointment.notes}</p>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  {appointment.status === 'scheduled' && (
                    <Button size="sm">
                      <Video className="w-4 h-4 mr-2" />
                      Join Call
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search terms or filters.</p>
          <Button>Schedule Your First Appointment</Button>
        </div>
      )}
    </div>
  );
};

export const Route = createFileRoute({
  component: AppointmentsList,
})
