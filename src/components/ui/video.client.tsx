import React, { useEffect , useState } from 'react'
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

    // const { default: uitoolkit} = await import("@zoom/videosdk-ui-toolkit");
    const client = ZoomVideo.createClient();
    client.init('en-US', 'Global');
    const joined = await client.join(session_name, json.token, user_identity);
    const stream = client.getMediaStream();
    await stream.startVideo();
    await stream.startAudio();

    if (stream.isRenderSelfViewWithVideoElement()) {
      const element = await stream.attachVideo(client.getCurrentUserInfo().userId, VideoQuality.Video_720P) as VideoPlayer;
      console.log(`element:${element?.localName}`);

      if (element?.style) {
        element.style.marginTop = '33%';
        document.querySelector('#my-self-view-container')?.prepend(element);
      }
    } else {
        console.log('missing something?')
    }

    client.on('user-added', (payload) => {
      payload.forEach((item) => {
        console.log({ item });
        attachVIdeo(item, stream);
      })
    })

    client.on('user-updated', (payload) => {
      payload.forEach((item) => {
        console.log(`${item.userId} properties were updated.`);
        attachVIdeo(item, stream);
      });
    });

    client.on('user-removed', (payload) => {
      console.log({ payload })
      document.querySelector('#patient-video-container video-player')?.remove()
    })

    // If the patient arrived to the room before provider, or when refreshing
    client.getAllUser().forEach((user) => {
      console.log('initial:users', { user });
      attachVIdeo(user, stream);
    })

    router.subscribe('onBeforeNavigate', (event) => {
      console.log('Navigation is about to occur:', { event, stream });
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
