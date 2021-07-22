import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import { DownArrow } from '~/assets/svg';

const VideoSection = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  return (
    <>
      <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
        <video ref={videoRef} width="100%" height="100%" autoPlay muted loop style={{ objectFit: 'cover' }}>
          <source src="/assets/video/lisa.mp4" type="video/mp4"></source>
          Your browser does not support the video tag.
        </video>
        <Button
          type="link"
          className="mute-button"
          onClick={() => {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
          }}>
          {isMuted ? (
            <img src="/assets/icons/icon-muted.svg" alt="muted" width="35px" height="35px" />
          ) : (
            <img src="/assets/icons/icon-unmuted.svg" alt="unmuted" width="35px" height="35px" />
          )}
        </Button>
        <div className="w-100 d-flex flex-column justify-content-center align-items-center" style={{ position: 'absolute', top: '50%' }}>
          <h2 className="big-header temp-heading-1 mb-5 w-100" style={{ color: '#fff', textAlign: 'center', fontSize: '68px' }}>
            Hot BÉIS Summer
          </h2>
          <Button
            type="primary"
            className="d-flex align-items-center justify-content-center py-3"
            style={{
              width: '400px',
              textTransform: 'uppercase',
              letterSpacing: '1.2px',
              lineHeight: '2.17',
              fontSize: '14px',
              fontFamily: 'Brandon Grotesque Bold'
            }}>
            SHOP Best Sellers
          </Button>
        </div>
        <DownArrow style={{ position: 'absolute', bottom: '10%', left: '48.9%' }} />
      </div>
    </>
  );
};

export default VideoSection;
