import { MeetingRoom } from '../../components/portal/ui.meeting.room';
import UpcomingCalls from '../../components/portal/ui.upcoming.video';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { UserProfile } from '../../markket';

function VideoCallPage() {
  const [patientData] = useState({
    name: 'Alice Smith',
    type: 'Follow-up',
    goals: 'Weight Loss, Sleep',
    scheduledDuration: 60
  });

  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData(['profile']) as UserProfile | undefined;

  const search = Route.useSearch();
  const session_name = search.session || '';

  if (session_name) {
    return (
      <MeetingRoom
        patient={patientData}
        doctor={{
          name: profile?.displayName || profile?.email || ''
        }}
        isDemo={true}
        demoTimeLimit={300} // 5 minutes
        session_name={session_name}
      />
    );
  }

  return (<UpcomingCalls />)
}


export const Route = createFileRoute({
  component: VideoCallPage,
});
