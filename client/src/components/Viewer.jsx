import React from "react";
import VideoPlayer from "react-video-js-player"

function Player (props){
    const videoSrc = `https://cdn.livepeer.com/hls/${props.playbackId}/index.m3u8`;
    return(
        <div>
            <VideoPlayer src = {videoSrc} width = '720' height='420'></VideoPlayer>
        </div>
    );
}
export default Player;