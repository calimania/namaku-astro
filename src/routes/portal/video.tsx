import { MeetingRoom } from '../../components/portal.meeting.room';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

function VideoCallPage() {

  const [patientData, setPatientData] = useState({
    name: 'Alice Smith',
    type: 'Follow-up',
    goals: 'Weight Loss, Sleep',
    scheduledDuration: 60
  });

  const { data: profile } = useQuery({
    queryKey: ["profile"],
  });

  return (
    <MeetingRoom
      patient={patientData}
      doctor={{
        name: profile?.displayName || profile?.email || ''
      }}
      isDemo={true}
      demoTimeLimit={300} // 5 minutes
    />
  );
}

export const Route = createFileRoute({
  component: VideoCallPage,
})
