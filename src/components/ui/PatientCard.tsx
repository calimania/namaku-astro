import React from 'react';
import { IconPhone as Phone,  IconCalendar as Calendar } from '@tabler/icons-react';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { type  Patient } from '../../markket/index.d';
import { formatDate } from '../../lib/date';

interface PatientCardProps {
  patient: Patient;
  onViewDetails: (patient: Patient) => void;
  onScheduleAppointment: (patient: Patient) => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  onViewDetails,
  onScheduleAppointment
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Avatar name={patient.name} size="lg" />
          <div>
            <h3 className="font-semibold text-gray-900">{patient.name}</h3>
            <p className="text-sm text-gray-600">{patient.email}</p>
            <div className="flex items-center space-x-2 mt-2">
              {patient.healthGoals.slice(0, 2).map((goal, index) => (
                <Badge key={index} variant="secondary" size="sm">
                  {goal}
                </Badge>
              ))}
              {patient.healthGoals.length > 2 && (
                <Badge variant="neutral" size="sm">
                  +{patient.healthGoals.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center space-x-2 text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{patient.phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>
            {patient.lastVisit ? `Last visit: ${formatDate(patient.lastVisit)}` : 'No visits yet'}
          </span>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onViewDetails(patient)}
        >
          View Details
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="flex-1"
          onClick={() => onScheduleAppointment(patient)}
        >
          Schedule
        </Button>
      </div>
    </Card>
  );
};
