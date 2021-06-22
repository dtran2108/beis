import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'recompose';
import { Badge, Row, Col, Typography, message } from 'antd';
import { withRouter } from 'next/router';
import { ShoppingCartOutlined, FileTextOutlined, PictureOutlined } from '@ant-design/icons';

import styled from 'styled-components';
import UIImage from '~/views/presentation/ui/Image/UIImage';
import _ from 'lodash';
import COLOR from '~/utils/layout/color';
import { ICONS } from '~/configs/icons';
import { STATUS_PLAYER } from '~/configs/constants';
import { useScroll } from '~/container/hooks/home';
import ReactPlayer from 'react-player';

const WrapVideoPlayer = styled.div`
  .disabled_video {
    pointer-events: none;
    opacity: 0.4;
  }
`;

const MAX_SUPPORT_SECOND_TRUE = 2.2;

const VideoPlayer = (props) => {
  const [scrollX, scrollY] = useScroll();
  const videoRef = useRef();

  const [duration, setDuration] = useState(0);
  const [statusPlayer, setStatusPlayer] = useState('');
  const [ended, setEnded] = useState(true);
  const [playedSecond, setPlayedSecond] = useState(0);
  const [playedSecondTrue, setPlayedSecondTrue] = useState(0);
  const [isSeek, setIsSeek] = useState(false);
  const [rect, setRect] = useState();
  const [statePlayer, setStatePlayer] = useState({
    playedSeconds: 0,
    played: 0,
    loadedSeconds: 0,
    loaded: 0
  });

  useEffect(() => {
    const rect = ReactDOM.findDOMNode(videoRef.current).getBoundingClientRect();
    setRect(rect);
    return () => {};
  }, []);

  const handleProgress = (state) => {
    if (ended && statusPlayer !== STATUS_PLAYER.PLAYING) return; // xem xong rồi hoặc pause thì xem lại không cần tính toán nữa

    // Check xem video có đang được xem đúng cách
    if (state.playedSeconds - statePlayer.playedSeconds <= MAX_SUPPORT_SECOND_TRUE && state.playedSeconds - statePlayer.playedSeconds > 0) {
      // 2.2s là do người dùng có thể x2 tốc độ xem
      setPlayedSecond(playedSecond + state.playedSeconds - statePlayer.playedSeconds);

      if (!isSeek) {
        setPlayedSecondTrue(playedSecond + state.playedSeconds - statePlayer.playedSeconds);
      }
    } else {
      setIsSeek(true);
      if (state.playedSeconds - playedSecondTrue <= MAX_SUPPORT_SECOND_TRUE && state.playedSeconds - playedSecondTrue > 0) {
        // trường hợp người dùng seek lại giây trước đó đã xem
        setPlayedSecondTrue(playedSecond);
        setPlayedSecond(playedSecond);
        setIsSeek(false);
      }
    }

    if (scrollY > rect.top + rect.height / 2) {
      window.scroll({
        top: rect.top - rect.height / 2,
        left: 0,
        behavior: 'auto'
      });
      message.warning({
        content: t('common:warning_video'),
        duration: 5
      });
    }

    if (state.playedSeconds - statePlayer.playedSeconds > MAX_SUPPORT_SECOND_TRUE) {
      message.warning({
        content: t('common:warning_video'),
        style: {
          marginTop: '60vh'
        },
        duration: 5
      });
      setStatePlayer(state);
      props.setWarning(true);
    } else {
      setStatePlayer(state);
      props.setWarning(false);
    }
  };

  const handleEndedVideo = () => {
    // 31 29.310980028610214 x1
    // 31 30.104063465393082 x2
    // 31 29.585478905586246 x1.5
    if (duration - playedSecond <= duration * 0.02 + MAX_SUPPORT_SECOND_TRUE) {
      // thời lượng xem hơn 98% thì cho làm câu hỏi
      props.setDisableQuestions(false);
      if (props.setDisableQuestion) props.setDisableQuestion(false);
      setEnded(true);
      setStatusPlayer(STATUS_PLAYER.ENDED);
      props.setVideoPlaying(_.filter(props.videoPlaying, _.includes(props.videoPlaying, props.idVideo) === false)); // trường hợp 01 video khác đang chạy
    } else {
      setEnded(true);
      setPlayedSecond(0);
      message.warning({
        content: t('common:warning_video'),
        style: {
          marginTop: '60vh'
        },
        duration: 5
      });
    }
    setStatusPlayer(STATUS_PLAYER.ENDED);
  };

  return (
    <WrapVideoPlayer ref={videoRef} className="w-100">
      <div
        className={`d-flex flex-column justify-content-center align-items-center  ${
          props.disableQuestions || (props.videoPlaying.length !== 0 && _.includes(props.videoPlaying, props.idVideo) === false)
            ? `disabled_video`
            : ``
        }`}>
        <Typography.Paragraph strong className="mt-3">
          {t('common:view_video_require')}
        </Typography.Paragraph>
        <ReactPlayer
          className="mt-1 mb-5"
          width={640 * 1.25}
          height={360 * 1.25}
          controls={true}
          light={true}
          config={{
            youtube: {
              //https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
              playerVars: { autoplay: 1 }
            }
          }}
          onDuration={(duration) => {
            setDuration(duration);
          }}
          onPause={() => {
            setStatusPlayer(STATUS_PLAYER.PAUSE);
          }}
          onPlay={() => {
            if (statusPlayer === STATUS_PLAYER.ENDED && !ended) {
              setPlayedSecond(0);
            }
            setStatusPlayer(STATUS_PLAYER.PLAYING);
            if (_.includes(props.videoPlaying, props.idVideo) === false) {
              props.setVideoPlaying([...props.videoPlaying, props.idVideo]);
            }
          }}
          onProgress={handleProgress}
          onError={() => {
            setStatusPlayer(STATUS_PLAYER.ERROR);
          }}
          onEnded={() => {
            handleEndedVideo();
          }}
          playIcon={<UIImage width={78} height={78} src={ICONS.play} />}
          url={props.url}
        />
      </div>
    </WrapVideoPlayer>
  );
};

export default compose(withRouter)(VideoPlayer);
