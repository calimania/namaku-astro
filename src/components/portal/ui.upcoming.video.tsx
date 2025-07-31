



import { IconVideoPlus, IconLink } from '@tabler/icons-react';

const generateSessionId = () => {
  // Simple secure random string (16 chars)
  return Array.from(crypto.getRandomValues(new Uint8Array(16)), b => b.toString(16).padStart(2, '0')).join('');
};

const UpcomingVideoCalls = () => {
  const handleStartCall = () => {
    const session = generateSessionId();
    window.location.href = `/portal/video?session=${session}&inviteModal=1`;
  };
  return (
    <div className="flex flex-col items-center justify-center h-full py-24 bg-gradient-to-br from-blue-50 to-emerald-50">
      <h2 className="text-2xl font-bold mb-8 text-gray-900">No upcoming video calls</h2>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6 flex flex-col items-center mb-4 transition-all hover:shadow-2xl">
          <div className="flex items-center space-x-3 mb-2">
            <span className="inline-flex items-center justify-center bg-blue-100 text-blue-600 rounded-full p-3 shadow-md">
              <IconVideoPlus className="w-7 h-7" />
            </span>
            <span className="text-lg font-semibold text-gray-900">Start Instant Call</span>
          </div>
          <p className="text-gray-600 text-center mb-4 text-sm">
            Instantly create a secure meeting room and a unique link to send to a patient. Perfect for quick consults or urgent sessions.
          </p>
          <button
            onClick={handleStartCall}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-emerald-600 transition-all text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <IconLink className="w-5 h-5" />
            Start
          </button>
          <div className="text-xs text-gray-400 mt-3">Thank you for caring for your patients 💙</div>
        </div>
      </div>
    </div>
  );
}

export default UpcomingVideoCalls;
