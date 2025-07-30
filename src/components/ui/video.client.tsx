
import React, { useEffect  } from 'react'
import { markketplace } from '../../markket.config';
import { useRouter } from '@tanstack/react-router';
import { getJWT } from '../../lib/zoom';
// import uitoolkit from "@zoom/videosdk-ui-toolkit";
import "@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css";
import type { VideoPlayer } from '@zoom/videosdk';

type VideoClientProps ={
  role: number;
}

/**
 * Provider interface for the video calls
 * Request a temp zoom validation token
 * @param props
 * @returns
 */
const VideoRoom = ({ role }: VideoClientProps) => {
  const user_identity = 'provider';
  const router = useRouter();

  const params = new URLSearchParams(window.location.search);
  const session_name = params.get('session') || '';

  const attachVIdeo = (user, stream) => {
    if (user.displayName !== user_identity && user.bVideoOn) {
      stream.attachVideo(user.userId, 3).then((userVideo) => {
        const videoContainer = document.querySelector('#patient-video-container');

        if (videoContainer) {
          videoContainer.innerHTML = '';
          videoContainer?.prepend(userVideo as VideoPlayer)
        }
      })
    }
  }

  const init = async () => {
    const { default: ZoomVideo,  VideoQuality } = await import('@zoom/videosdk');
    const json = await getJWT(markketplace.ehr, { user_identity, session_name, role, access_code: markketplace?.feature_flags?.zoom_call });

    if (!json?.token) {
      console.warn('token:error');
      return;
    }

    const client = ZoomVideo.createClient();
    client.init('en-US', 'Global');
    const joined = await client.join(session_name, json.token, user_identity);
    const stream = client.getMediaStream();
    await stream.startVideo();
    await stream.startAudio();

    const chatClient = client.getChatClient();
    const renderChatHistory = async () => {
      const chatContainer = document.getElementById('chat-container');
      if (!chatContainer) return;
      chatContainer.innerHTML = '';
      try {
        const history = await chatClient.getHistory();
        history.forEach(msg => {
          // msg.sender: { name, userId, ... }, msg.message, msg.timestamp
          const senderName = msg.sender?.name || 'Unknown';
          const isSelf = senderName === user_identity;
          const div = document.createElement('div');
          div.className = `rounded-xl p-3 shadow-sm mb-2 ${isSelf ? 'bg-blue-100 border-l-4 border-blue-500' : 'bg-emerald-100 border-l-4 border-emerald-500'}`;
          div.innerHTML = `<p class='text-sm'><strong class='${isSelf ? 'text-blue-800' : 'text-emerald-800'}'>${senderName}:</strong> <span class='text-gray-900'>${msg.message}</span></p><span class='text-xs ${isSelf ? 'text-blue-600' : 'text-emerald-600'}'>${new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>`;
          chatContainer.appendChild(div);
        });
        chatContainer.scrollTop = chatContainer.scrollHeight;
      } catch (e) {
        chatContainer.innerHTML = '<div class="text-xs text-gray-400">No chat history</div>';
      }
    };

    if (typeof chatClient.addEventListener === 'function') {
      chatClient.addEventListener('chat-message-received', renderChatHistory);
    } else {
      setInterval(renderChatHistory, 2000);
    }

    setTimeout(renderChatHistory, 500);

    setTimeout(() => {
      const sendBtn = document.getElementById('chat-send-message-button');
      const input = document.querySelector('#chat-form-container input') as HTMLInputElement | null;
      if (sendBtn && input) {
        sendBtn.addEventListener('click', async () => {
          const value = input.value.trim();
          if (value) {
            await chatClient.sendToAll(value);
            input.value = '';
            renderChatHistory();
          }
        });
      }

      if (input) {
        input.addEventListener('keypress', async (e) => {
          const event = e as KeyboardEvent;
          if (event.key === 'Enter') {
            event.preventDefault();
            const value = input.value.trim();
            if (value) {
              await chatClient.sendToAll(value);
              input.value = '';
              renderChatHistory();
            }
          }
        });
      }
    }, 800);

    setTimeout(() => {
      const muteBtn = document.getElementById('mute-unmute-button');
      const videoBtn = document.getElementById('video-toggle-button');
      let audioMuted = false;
      let videoOn = true;

      if (muteBtn) {
        muteBtn.addEventListener('click', async () => {
          if (audioMuted) {
            await stream.unmuteAudio();
            audioMuted = false;
          } else {
            await stream.muteAudio();
            audioMuted = true;
          }
        });
      }
      if (videoBtn) {
        videoBtn.addEventListener('click', async () => {
          if (videoOn) {
            await stream.stopVideo();
            videoOn = false;
          } else {
            await stream.startVideo();
            videoOn = true;
          }
        });
      }
    }, 800);

    if (stream.isRenderSelfViewWithVideoElement()) {
      const element = await stream.attachVideo(client.getCurrentUserInfo().userId, VideoQuality.Video_720P) as VideoPlayer;
      if (element?.style) {
        element.style.marginTop = '33%';
        document.querySelector('#my-self-view-container')?.prepend(element);
      }
    }

    client.on('user-added', (payload) => {
      payload.forEach((item) => {
        attachVIdeo(item, stream);
      })
    })

    client.on('user-updated', (payload) => {
      payload.forEach((item) => {
        attachVIdeo(item, stream);
      });
    });

    client.on('user-removed', (payload) => {
      document.querySelector('#patient-video-container video-player')?.remove()
    })

    client.getAllUser().forEach((user) => {
      attachVIdeo(user, stream);
    })

    router.subscribe('onBeforeNavigate', (event) => {
      if (stream?.isCapturingVideo()) {
        stream?.stopVideo();
        stream?.stopAudio();
        stream?.detachVideo(client.getCurrentUserInfo().userId);
        client?.leave();
        document.querySelector('#my-self-view-container video-player')?.remove();
      }
    });

    console.log({ json, joined });
  }

  useEffect(() => {
    if (!import.meta.env.SSR && session_name) {
      init();
    }
  }, [router]);

  return (
    <>
      <div id="sessionContainer"></div>
    </>
  );
}

export default VideoRoom;
