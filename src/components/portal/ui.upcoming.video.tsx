



import { useState } from 'react';
import { IconVideoPlus, IconLink, IconCopy, IconCheck, IconX } from '@tabler/icons-react';

const generateSessionId = () => {
  // Simple secure random string (16 chars)
  return Array.from(crypto.getRandomValues(new Uint8Array(16)), b => b.toString(16).padStart(2, '0')).join('');
};

const UpcomingVideoCalls = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [callLink, setCallLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const handleStartCall = () => {
    const session = generateSessionId();
    const link = `${window.location.origin}/meet?session=${session}&instant`;
    setSessionId(session);
    setCallLink(link);
    setModalOpen(true);
  };

  const handleCopy = () => {
    if (callLink) {
      navigator.clipboard.writeText(callLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCallLink(null);
    setSessionId(null);
    setCopied(false);
  };

  const handleRedirect = () => {
    if (sessionId) {
      window.location.href = `/portal/video?session=${sessionId}&inviteModal=1`;
    }
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
          <div className="text-xs text-gray-400 mt-3">💙</div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 p-8 w-full max-w-md relative animate-fade-in">
            <button
              onClick={handleModalClose}
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Close"
            >
              <IconX className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center gap-2">
              <IconLink className="w-6 h-6 text-blue-500" />
              Share this link with your client
            </h3>
            <p className="text-gray-600 mb-4 text-sm">Send this link to your patient so they can join the call. You can copy it below:</p>
            <div className="flex items-center bg-gray-50 border border-blue-100 rounded-lg px-3 py-2 mb-4">
              <input
                type="text"
                readOnly
                value={callLink || ''}
                className="flex-1 bg-transparent outline-none text-blue-700 font-mono text-sm select-all"
                aria-label="Call link"
              />
              <button
                onClick={handleCopy}
                className="ml-2 p-1 rounded hover:bg-blue-100 transition-colors"
                title="Copy link"
              >
                {copied ? <IconCheck className="w-5 h-5 text-emerald-500" /> : <IconCopy className="w-5 h-5 text-blue-500" />}
              </button>
            </div>
            <button
              onClick={handleRedirect}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-emerald-600 transition-all text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
            >
              <IconVideoPlus className="w-5 h-5" />
              Join Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpcomingVideoCalls;
