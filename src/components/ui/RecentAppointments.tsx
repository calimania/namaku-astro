import React from 'react';
import { IconClock as Clock, IconDeviceTv as  Video, IconGift as  Gift } from '@tabler/icons-react';
import { Card } from './Card';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { Button } from './Button';
import { formatTime } from '../../lib/date';
import { type Appointment } from '../../markket/index.d';

interface RecentAppointmentsProps {
  appointments: Appointment[];
}

export const RecentAppointments: React.FC<RecentAppointmentsProps> = ({
  appointments
}) => {
  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled': return 'primary';
      case 'completed': return 'success';
      case 'cancelled': return 'danger';
      case 'no-show': return 'warning';
      default: return 'neutral';
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Today's Appointments</h3>
        <Button variant="ghost" size="sm">View All</Button>
      </div>

      <div className="space-y-4">
        {appointments.slice(0, 5).map((appointment) => (
          <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-4">
              <Avatar name={appointment.patientName} size="md" />
              <div>
                <p className="font-medium text-gray-900">{appointment.patientName}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {formatTime(appointment.date)} ({appointment.duration} min)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Badge variant={getStatusColor(appointment.status)}>
                {appointment.status}
              </Badge>
              <div className="flex items-center space-x-2">
                {appointment.status === 'scheduled' && (
                  <Button size="sm" variant="primary">
                    <Video className="w-4 h-4 mr-2" />
                    Join Call
                  </Button>
                )}
                {appointment.status === 'scheduled' && (
                  <div className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    5 min demo
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {appointments.length === 0 && (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No appointments scheduled for today</p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mt-4">
              <div className="flex items-center justify-center space-x-2 text-emerald-700">
                <Gift className="w-5 h-5" />
                <span className="text-sm font-medium">Demo Mode: All calls limited to 5 minutes</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
