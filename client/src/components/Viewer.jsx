import React from "react";
import VideoPlayer from "react-video-js-player";
import styled from "styled-components";

function Player(props) {
  //   const videoSrc = `https://cdn.livepeer.com/hls/${props.playbackId}/index.m3u8`;
  const videoSrc =
    "https://www.youtube.com/watch?v=jGT6ob8hV6M&list=PLGwmAEmjn4fn0gqEfKYVVtdd_rsV_QKSJ";
  return (
    <div>
      <Container>
        <VideoPlayer src={videoSrc} width="720" height="420"></VideoPlayer>
      </Container>
    </div>
  );
}
export default Player;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 100vw;
`;
