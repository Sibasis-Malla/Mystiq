import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../helpers/Firebase";
import { useParams } from "react-router-dom";

const image =
  "https://res.cloudinary.com/diqqf3eq2/image/upload/c_scale,h_900,w_900/v1595959131/person-2_ipcjws.jpg";

const bg =
  "https://res.cloudinary.com/doybtqm8h/image/upload/v1648362954/kppppnzfvodiiw6xem3s.jpg";

const Background = styled.div`
  min-height: 20vh;
  max-width: 100vw;
  background: url(${bg}) no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  display: flex;
  justify-content: center;
`;

const Heading = styled.h1`
  font-size: 50px;
  margin: 0;
  margin-top: 100px;
  color: #000;
  font-family: Georgia, "Times New Roman", Times, serif;
  text-align: center;
`;

const ProfilePage = styled.div`
  background-color: #ffeddf;
  width: 100vw;
  padding: 20px;
  display: flex;
  margin: 0;
  margin-bottom: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 250px;
  position: relative;
  bottom: -125px;
  border-radius: 50%;
`;

const TextName = styled.h2`
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Montserrat", "Helvetica Neue",
    sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  margin: 0px;
  margin-top: 125px;
  color: #000000;
`;

const Description = styled.p`
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Montserrat", "Helvetica Neue",
    sans-serif;
  font-style: normal;
  font-size: 20px;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 10px;
  padding: 0px 30px;
  color: #000000;
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .icon {
    width: 25px;
    height: 25px;
    color: #000000;
    cursor: pointer;
    margin-right: 13px;
    margin-top: 10px;
    @media (max-width: 660px) {
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  gap: 20px;
  padding: 20px 50px;
  text-align: center;
`;

const Profile = () => {
  const [data, setData] = useState([]);
  const [dat, setDat] = useState({});
  const [src, setSrc] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  let { add } = useParams();
  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "data"));
      setData(querySnapshot.docs.map((doc) => doc.data()));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const temp = data.filter(({ address }) => address === add);
      setDat(temp);
      setIsLoading(false);
    })();
  }, [data]);

  console.log(dat[0]);

  return (
    <>
      {!isLoading && (
        <div style={{ overflowX: "hidden" }}>
          <Background>{dat[0] && <ProfileImg src={dat[0].image} />}</Background>
          <ProfilePage>
            {dat[0] && <TextName>{dat[0].name}</TextName>}
            <Description>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut
              placerat nibh.
            </Description>
            <Heading>Content</Heading>
            <CardContainer>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/WMsWPz-KZoo"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/WMsWPz-KZoo"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/WMsWPz-KZoo"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </CardContainer>
          </ProfilePage>
        </div>
      )}
    </>
  );
};

export default Profile;
