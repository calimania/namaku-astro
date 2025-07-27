import React, { useEffect , useState } from 'react'
import { markketplace } from '../../markket.config';
import { useRouter } from '@tanstack/react-router';
// import uitoolkit from "@zoom/videosdk-ui-toolkit";
import "@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css";

type VideoClientProps ={
  role: number;
}

/**
 * Requests a JWT to identify the client with zoom
 * @param param // Role_type – the user role. 1 specifies host or co-host, while 0 specifies participant
 * @returns
 */
const getJWT = async ({ user_identity, session_name, role }: { user_identity: string, session_name: string, role: number}) => {
  const response = await fetch(new URL('/api/zoom', markketplace.ehr), {
    method: 'POST',
    body: JSON.stringify({
      action: 'jwt',
      access_code: markketplace.feature_flags.zoom_call,
      sessionName: session_name,
      role,
      sessionKey: '',
      userIdentity: user_identity,
    }),
    headers: {
      'Content-Type': 'application/json',
      accept: '*/*',
    }
  });
  return await response.json();
}

/**
 * Provider interface for the video calls
 * Request a temp zoom validation token
 * @param props
 * @returns
 */
const VideoRoom = ({ role }: VideoClientProps) => {
  const session_name = 'zoom-demo-meeting';
  const user_identity = 'user-a';
  const router = useRouter();

  const init = async () => {
    const { default: ZoomVideo,  VideoQuality } = await import('@zoom/videosdk');
    const json = await getJWT({ user_identity, session_name, role });

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
      const element = await stream.attachVideo(client.getCurrentUserInfo().userId, VideoQuality.Video_720P)
      console.log(`element:${element?.localName}`);

      if (element?.style) {
        element.style.marginTop = '33%';
        document.querySelector('#my-self-view-container').prepend(element);
      }
    } else {
        console.log('missing something?')
    }

   // https://developers.zoom.us/docs/video-sdk/web/video/
    // exernal participants joining
    //         client.join(topic, token, userName, password).then(() => {
    //   stream = zoomVideo.getMediaStream()
    //   client.getAllUser().forEach((user) => {
    //     if (user.bVideoOn) {
    //       stream.attachVideo(user.userId, 3).then((userVideo) => {
    //         document.querySelector('video-player-container').appendChild(userVideo)
    //       })
    //     }
    //   })
    // })
    // var sessionContainer = document.getElementById('sessionContainer')
    // uitoolkit.joinSession(sessionContainer as HTMLElement, config)
    // uitoolkit.onSessionJoined(() => {
    //   console.log('koined');
    // });

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
    if (!import.meta.env.SSR) {
      init();
    }
  }, [router]);

  return (
    <>
      <div id="sessionContainer"></div>
      ZOOOM
    </>
  );
}

export default VideoRoom;
