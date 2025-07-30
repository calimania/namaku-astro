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
  IconGift as Gift,
  IconUserCircle as User,
  IconSend as Send
} from '@tabler/icons-react';
import { Button } from './ui/Button';
import { Avatar } from './ui/Avatar';
import VideoClient from './ui/video.client';

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: Date;
}

interface MeetingRoomProps {
  patient?: {
    name: string;
    type: string;
    goals: string;
    scheduledDuration: number;
  };
  doctor?: {
    name: string;
  };
  isDemo?: boolean;
  demoTimeLimit?: number; // in seconds
  chatMessages?: ChatMessage[];
  onSendChat?: (msg: string) => void;
}

export const MeetingRoom: React.FC<MeetingRoomProps> = ({
  patient = {
    name: 'Alice Smith',
    type: 'Follow-up',
    goals: 'Weight Loss, Sleep',
    scheduledDuration: 60
  },
  doctor = {
    name: 'Dr. Sarah Johnson'
  },
  isDemo = true,
  demoTimeLimit = 300, // 5 minutes
  chatMessages,
  onSendChat
}) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [demoTimeLeft, setDemoTimeLeft] = useState(demoTimeLimit);
  const [chatMessage, setChatMessage] = useState('');

  // Demo timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
      if (isDemo) {
        setDemoTimeLeft(prev => Math.max(0, prev - 1));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isDemo]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const sendMessage = () => {
    if (chatMessage.trim()) {
      if (onSendChat) {
        onSendChat(chatMessage);
      }
      setChatMessage('');
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const diff = Date.now() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    return minutes < 1 ? 'now' : `${minutes} min ago`;
  };

  return (
    <div className="h-full bg-gray-900 flex flex-col">
      {/* Demo Banner */}
      {isDemo && (
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Gift className="w-5 h-5 animate-pulse" />
              <span className="font-medium">Demo Mode - Free 5 Minute Call</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="font-mono bg-white/20 px-2 py-1 rounded">
                  Demo time left: {formatTime(demoTimeLeft)}
                </span>
              </div>
              <div className="text-sm opacity-90">
                Call duration: {formatTime(callDuration)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Video Area */}
      <div className="flex-1 flex">
        <VideoClient role={1} />

        {/* Primary Video */}
        <div className="flex-1 relative bg-gray-800 flex items-center justify-center overflow-hidden" id="patient-video-container">
          <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600 flex items-center justify-center relative">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] animate-pulse"></div>
            </div>

            <div className="text-center text-white z-10">
              <Avatar
                name={patient.name}
                size="xl"
                className="mx-auto mb-4 w-24 h-24 ring-4 ring-white/20 shadow-2xl"
              />
              <h3 className="text-3xl font-bold mb-2 drop-shadow-lg">{patient.name}</h3>
              <p className="text-blue-100 text-lg font-medium">Patient</p>
              {!isVideoOn && (
                <div className="mt-4 text-sm opacity-75 bg-black/30 px-3 py-1 rounded-full">
                  Camera is off
                </div>
              )}
            </div>
          </div>

          {/* Control Bar */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-md rounded-full px-6 py-3 shadow-xl border border-white/10">
              <button
                onClick={() => setIsAudioOn(!isAudioOn)}
                id="mute-unmute-button"
                className={`p-3 rounded-full transition-all duration-200 transform hover:scale-110 ${
                  isAudioOn
                    ? 'bg-gray-700/80 text-white hover:bg-gray-600'
                    : 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
                }`}
                title={isAudioOn ? 'Mute' : 'Unmute'}
              >
                {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                id="video-toggle-button"
                className={`p-3 rounded-full transition-all duration-200 transform hover:scale-110 ${
                  isVideoOn
                    ? 'bg-gray-700/80 text-white hover:bg-gray-600'
                    : 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
                }`}
                title={isVideoOn ? 'Turn off camera' : 'Turn on camera'}
              >
                {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button
                className="p-3 rounded-full bg-gray-700/80 text-white hover:bg-gray-600 transition-all duration-200 transform hover:scale-110"
                title="Share screen"
              >
                <Share className="w-5 h-5" />
              </button>

              <button
                className="p-3 rounded-full bg-gray-700/80 text-white hover:bg-gray-600 transition-all duration-200 transform hover:scale-110"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>

              <button
                className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-200 transform hover:scale-110 shadow-lg"
                title="End call"
              >
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col shadow-xl">
          {/* Self Video */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="relative bg-gray-800 rounded-xl overflow-hidden h-32 shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                <div className="text-center text-white" id="my-self-view-container">
                  <Avatar name={doctor.name} size="md" className="mx-auto mb-2 ring-2 ring-white/30" />
                  <p className="text-xs font-medium">You</p>
                </div>
              </div>
            </div>
          </div>

          {/* Session Info */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-br from-blue-50 to-emerald-50">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center">
              <User className="w-4 h-4 mr-2 text-blue-600" />
              Session Details
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                <span className="text-gray-600 font-medium">Patient:</span>
                <span className="font-bold text-gray-900">{patient.name}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                <span className="text-gray-600 font-medium">Type:</span>
                <span className="font-bold text-blue-600">{patient.type}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                <span className="text-gray-600 font-medium">Scheduled:</span>
                <span className="font-bold text-emerald-600">{patient.scheduledDuration} min</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                <span className="text-gray-600 font-medium">Goals:</span>
                <span className="font-bold text-purple-600">{patient.goals}</span>
              </div>
            </div>
          </div>

          {/* Chat */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <h3 className="font-bold text-gray-900 flex items-center">
                <MessageCircle className="w-4 h-4 mr-2 text-blue-600" />
                Session Chat
              </h3>
            </div>

            <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50" id="chat-container">
              {(chatMessages || []).map((msg, index) => (
                <div key={index} className={`rounded-xl p-3 shadow-sm ${
                  msg.sender === doctor.name
                    ? 'bg-blue-100 border-l-4 border-blue-500'
                    : 'bg-emerald-100 border-l-4 border-emerald-500'
                }`}>
                  <p className="text-sm">
                    <strong className={msg.sender === doctor.name ? 'text-blue-800' : 'text-emerald-800'}>
                      {msg.sender}:
                    </strong>{' '}
                    <span className="text-gray-900">{msg.message}</span>
                  </p>
                  <span className={`text-xs ${
                    msg.sender === doctor.name ? 'text-blue-600' : 'text-emerald-600'
                  }`}>
                    {getTimeAgo(msg.timestamp)}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200 bg-white">
              <form action="" id="chat-form-container">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm"
                  />
                  <Button
                    size="sm"
                    onClick={sendMessage}
                    id="chat-send-message-button"
                    className="bg-blue-600 hover:bg-blue-700 px-3"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;
