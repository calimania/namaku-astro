import React, { useState, useEffect } from 'react';
import {
  IconDeviceTv as Video,
  IconDeviceTvOff as VideoOff,
  IconMicrophone as Mic,
  IconMicrophoneOff as MicOff,
  IconPhone as Phone,
  IconSettings as Settings,
  IconMessageChatbotFilled as MessageCircle,
  IconShare as Share,
  IconClock as Clock,
  IconGift as Gift
} from '@tabler/icons-react';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';

export const VideoCallPage: React.FC = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [demoTimeLeft, setDemoTimeLeft] = useState(300); // 5 minutes in seconds

  // Demo timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
      setDemoTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDemoTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full bg-gray-900 flex flex-col">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Gift className="w-5 h-5" />
            <span className="font-medium">Demo Mode - Free 5 Minute Call</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className="font-mono">Demo time left: {formatDemoTime(demoTimeLeft)}</span>
            </div>
            <div className="text-sm opacity-90">
              Call duration: {formatTime(callDuration)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 flex">
        {/* Primary Video */}
        <div className="flex-1 relative bg-gray-800 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-emerald-600 flex items-center justify-center">
            <div className="text-center text-white">
              <Avatar name="Alice Smith" size="xl" className="mx-auto mb-4 w-24 h-24" />
              <h3 className="text-2xl font-semibold mb-2">Alice Smith</h3>
              <p className="text-blue-100">Patient</p>
              {!isVideoOn && (
                <div className="mt-4 text-sm opacity-75">Camera is off</div>
              )}
            </div>
          </div>

          {/* Video Controls Overlay */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-4 bg-black bg-opacity-50 rounded-full px-6 py-3">
              <button
                onClick={() => setIsAudioOn(!isAudioOn)}
                className={`p-3 rounded-full transition-colors ${
                  isAudioOn ? 'bg-gray-700 text-white' : 'bg-red-600 text-white'
                }`}
              >
                {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-3 rounded-full transition-colors ${
                  isVideoOn ? 'bg-gray-700 text-white' : 'bg-red-600 text-white'
                }`}
              >
                {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                <Share className="w-5 h-5" />
              </button>

              <button className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>

              <button className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors">
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          {/* Self Video */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative bg-gray-800 rounded-lg overflow-hidden h-32">
              <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <Avatar name="Dr. Sarah Johnson" size="md" className="mx-auto mb-2" />
                  <p className="text-xs">You</p>
                </div>
              </div>
            </div>
          </div>

          {/* Session Info */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Session Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Patient:</span>
                <span className="font-medium">Alice Smith</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium">Follow-up</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Scheduled:</span>
                <span className="font-medium">60 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Goals:</span>
                <span className="font-medium">Weight Loss, Sleep</span>
              </div>
            </div>
          </div>

          {/* Chat */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                Session Chat
              </h3>
            </div>

            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-blue-900">
                  <strong>Dr. Johnson:</strong> How have you been feeling since our last session?
                </p>
                <span className="text-xs text-blue-600">2 min ago</span>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-900">
                  <strong>Alice:</strong> Much better! I've been following the sleep schedule we discussed.
                </p>
                <span className="text-xs text-gray-600">1 min ago</span>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <Button size="sm">Send</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SDK Integration Note */}
      <div className="bg-gray-800 text-white px-6 py-3 text-center">
        <p className="text-sm">
          🔧 <strong>Integration Ready:</strong> This interface is designed to work with your video SDK.
          Replace the demo video areas with your SDK's video components.
        </p>
      </div>
    </div>
  );
};

export const Route = createFileRoute({
  component: VideoCallPage,
})
