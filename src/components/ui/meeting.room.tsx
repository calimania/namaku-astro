import { useState } from 'react'
import { markketplace } from '../../markket.config';
import "@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css";
import { getJWT } from '../../lib/zoom';
import uitoolkit, { type CustomizationOptions } from "@zoom/videosdk-ui-toolkit";

type VideoClientProps ={
  role: number;
  user_identity: string;
}

/**
 * Provider interface for the video calls
 * Request a temp zoom validation token
 *
 * Client or patient screen, it uses no authentication except for the unique link for ease
 * Waiting room and zoom ui interface to communicate with our coaches
 *
 * @param props
 * @returns
 */
const VideoRoom = ({ role, user_identity }: VideoClientProps) => {
  const [welcome, setWelcome] = useState(true);
  const params = new URLSearchParams(window.location.search);
  const session_name = params.get('session') || '';

  const sessionClosed = () => {
    console.log("session:closed");
    setWelcome(false);
  };

  const sessionDestroyed = () => {
    console.log("session:destroyed");
    uitoolkit.destroy();
  };

  const init = async () => {
    const json = await getJWT(markketplace.ehr, { user_identity, session_name, role, access_code: markketplace?.feature_flags?.zoom_call });

    if (!json?.token) {
      console.warn('token:error');
      return;
    }

    const config: CustomizationOptions = {
      videoSDKJWT: json.token,
      sessionName: session_name,
      userName: user_identity,
      sessionPasscode: "",
      featuresOptions: {
        preview: {
          enable: true,
        },
        virtualBackground: {
          enable: true,
          virtualBackgrounds: [
            {
              url: markketplace.styles.meeting_bg,
            },
          ],
        },
      },
    };

    const sessionContainer = document.getElementById(
      "sessionContainer"
    ) as HTMLDivElement;
    if (sessionContainer) {
      setWelcome(false);
      uitoolkit.joinSession(sessionContainer, config);
      sessionContainer && uitoolkit.onSessionClosed(sessionClosed);
      uitoolkit.onSessionDestroyed(sessionDestroyed);
    }

    console.log({ json, });
  }

  return (
    <main>
      {welcome && (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-100 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-10 space-y-6 text-center border border-indigo-100">
            <h1 className="!text-3xl font-extrabold text-gray-800 !mb-2">
              Welcome to Meeting Room
            </h1>
            <p className="text-gray-600 leading-relaxed !mb-4">
              Tap below to check your video & audio before connecting.
            </p>
            <button
              onClick={init}
              disabled={!session_name}
              className="w-full !py-2 !mt-4 !text-lg font-semibold rounded-xl shadow-md !bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 !text-white hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300"
            >
              {session_name && 'Get Started' || ' invalid session '}
            </button>
            <p className="text-sm text-gray-400 pt-4 italic mt-4">
              You&apos;ll be able to adjust video/mic settings before entering.
            </p>
          </div>
        </div>
      )}
      <div id="sessionContainer" className='min-h-[100vh]'></div>
    </main>
  );
}

export default VideoRoom;
