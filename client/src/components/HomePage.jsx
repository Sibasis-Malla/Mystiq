import React from "react";
import styled from "styled-components";
import Video from "../assets/video1.mp4";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import Video from "../../assets/video1.mp4";
import HoverVideoPlayer from "react-hover-video-player";


const Dashboard = ({ name, address, image }) => {
  return (
    <>
      <VideoContainer>
        <HoverVideoPlayer
          videoSrc={Video}
          pausedOverlay={
            <img
              src={image}
              alt=""
              style={{
                // Make the image expand to cover the video's dimensions
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          }
          loadingOverlay={
            <div className="loading-overlay">
              <div className="loading-spinner" />
            </div>
          }
        />
        <VideoPlayer></VideoPlayer>

        <div>
          <Container>
            <img src={image} />
            <Details>
            <a class="d-grid btn btn-primary mx-auto">
            <Link
              to={address}
              onClick={() => localStorage.setItem("CurrentCreator",address)}
              style={{ textDecoration: "none", color: "#FFF" }}
            >
              {name}
            </Link>
          </a>
          
            </Details>
          </Container>
        </div>
      </VideoContainer>
    </>
  );
};

export default Dashboard;

const VideoContainer = styled.div`
  background-color: red;
  color: white;
  border: 2px solid red;

  margin-top: 1rem;
  margin-left: 2rem;
  display: grid;
  place-items: center;
`;

const Details = styled.div`
  margin: 0rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  > h1 {
    margin-bottom: -0.5rem;
  }
  > p {
  }
  > h1 {
    font-weight: bold;
    font-size: 15px;
  }
`;

const Container = styled.div`
  display: flex;
  > img {
    border-radius: 50%;
    height: 40px;
    width: 40px;
    margin-top: 1rem;
  }
`;

const VideoPlayer = styled.div`
  /* height: 325px;
  width: 450px; */
  margin-bottom: -20rem;
`;
