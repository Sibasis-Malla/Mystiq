import React,{useEffect,useState} from "react";
import VideoPlayer from "react-video-js-player";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../helpers/Firebase";
import Loading from "./Loading/Loading";
function Player(props) {
  const [data, setData] = useState([]);
  const [dat, setDat] = useState({});
  const [isloading, setIsLoading] = useState(true);
  let { uid } = useParams();
  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "data"));
      setData(querySnapshot.docs.map((doc) => doc.data()));
    })();
  }, []);

  console.log(data);
  

  useEffect(() => {
    (async () => {
      const temp = data.filter(({ id }) => id === uid);
      setDat(temp);
      setIsLoading(false);
    })();
  }, [data]);

  // const videoSrc = `https://cdn.livepeer.com/hls/${dat[0].playbackId}/index.m3u8`;
  if(dat[0] && dat[0].playbackId) console.log(dat[0].playbackId);
  if(isloading)
  {
    return(
  <>
    <Loading/>

  </>
    )
  }
  return (
    <div>
    
      <Container>
        {dat[0] && dat[0].playbackId && <VideoPlayer src={`https://cdn.livepeer.com/hls/${dat[0].playbackId}/index.m3u8`} width="720" height="420"></VideoPlayer>}
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
