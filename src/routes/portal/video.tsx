import { MeetingRoom } from '../../components/portal.meeting.room';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { UserProfile } from '../../markket';

function VideoCallPage() {

  const [patientData, setPatientData] = useState({
    name: 'Alice Smith',
    type: 'Follow-up',
    goals: 'Weight Loss, Sleep',
    scheduledDuration: 60
  });

  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData(['profile']) as UserProfile | undefined;

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
