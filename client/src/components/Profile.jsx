import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../helpers/Firebase";
import { Link, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import getlit from "../helpers/AlchemyNFT";
import Loading from "./Loading/Loading";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

// function withRouter(Component) {
//   function ComponentWithRouterProp(props) {
//     let location = useLocation();
//     let navigate = useNavigate();
//     let params = useParams();
//     return (
//       <Component
//         {...props}
//         router={{ location, navigate, params }}
//       />
//     );
//   }

//   return ComponentWithRouterProp;
// }


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
  color:white;

`;

const ProfilePage = styled.div`
  background-color: rgb(3,9,40);
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
  color:white;

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
  color:white;
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
  color:white;

    @media (max-width: 660px) {
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items:center;
  gap: 20px;
  padding: 20px 50px;
  text-align: center;
  color:white;
 margin-left:200px;
 position:relative;
 right:50px;
`;

const Profile = () => {
  const [data, setData] = useState([]);
  const [dat, setDat] = useState({});
 // const [timer,set]
  const [isLoading, setIsLoading] = useState(true);

  let { add } = useParams();
  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "data"));
      setData(querySnapshot.docs.map((doc) => doc.data()));
    })();
  }, []);

  console.log(data);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false)
  //   }, 2000);
  //   //return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    (async () => {
      const temp = data.filter(({ address }) => address === add);
      setDat(temp);
    })();
  }, [data]);

  const [isAuth,setAuth]= useState(false)
  useEffect(() => {
    (async () => {
      let temp = 0;
      if(dat[0] && dat[0].teamId)
      {
        temp = await getlit(localStorage.getItem("CurrentAccount"),dat[0].teamId)
      }
      console.log(temp)
      if(temp>0){
        setAuth(true)
        setIsLoading(false)
      }
    })();
  })
  //console.log(isLoading, "==>", isAuth)
    return (
      <>
       <Sidebar/>
       <div > 
       {isLoading ? <Loading /> : isAuth && 
          <div style={{ overflowX: "hidden" }}>
            <Background >{dat[0] && <ProfileImg src={dat[0].image} />}</Background>
            <ProfilePage>
              {dat[0] && <TextName>{dat[0].name}</TextName>}
              <Description>
              Make it simple. Make it memorable. 
              </Description>
              {dat[0] && dat[0].live && 
              <Link to={`${dat[0].id}/stream`}>
                <div class="d-grid btn btn-primary mx-auto">
                  Live
                </div>
                </Link>
              }
              <Heading >Content</Heading>
              <CardContainer>
                <iframe
                  width="400"
                  height="315"
                  src="https://res.cloudinary.com/doybtqm8h/video/upload/v1648903529/videoplayback_1_tzyoif.mp4"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
                <iframe
                  width="400"
                  height="315"
                  src="https://res.cloudinary.com/doybtqm8h/video/upload/v1648903529/videoplayback_1_tzyoif.mp4"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
                
              </CardContainer>
            </ProfilePage>
          </div>
        }

       </div>
        
      </>
    );
  

  // console.log(dat[0]);

};

export default Profile;
