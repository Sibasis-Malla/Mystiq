import React, { useEffect, useState } from "react";
import { fetchData } from "../helpers/livepeer";
import styled from "styled-components";
import Modal from "./Modal/Modal";
import Sidebar from "./Sidebar";

import { doc, getDocs } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "../helpers/Firebase";
import { updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import Livepeer from "../assets/livepeer.png";

function StartStream() {
  window.ethereum.on('accountsChanged', function (accounts) {
    setTimeout(function(){window.location.reload(false)},2000)
  })
  let { id, add } = useParams();
  let fid = 0;
  const [isAuth, setAuth] = useState(false);
  useEffect(() => {
    if (
      add.toLowerCase() === localStorage.getItem("CurrentAccount").toLowerCase()
    ) {
      setAuth(true);
    }
  }, [localStorage.getItem("CurrentAccount").toLowerCase()]);

  const [LivepeerApiKey, setKey] = useState("");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[isLive,setIsLive] = useState(false)

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(LivepeerApiKey);
    await fetchData(LivepeerApiKey, id);
    console.log("After FetchData() is called");
    openModal();
    const q = query(collection(db, "data"), where("id", "==", id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      fid = doc.id;
    });

    const docRef = doc(db, "data", fid);
    updateDoc(docRef, {
      live: true,
    }).then(() => {
      console.log("Updated");
    });
  };
  const handleLive=async (event)=>{
    event.preventDefault();
    const q = query(collection(db, "data"), where("id", "==", id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      fid = doc.id;
    });

    const docRef = doc(db, "data", fid);
    updateDoc(docRef, {
      live: false,
    }).then(() => {
      alert("Streaming Stopped")
    });
  }
  const handleAPIKey = (event) => {
    setKey(() => ([event.target.name] = event.target.value));
  };

  if (isAuth) {
    return (
      <div>
        <Sidebar />
        <FormContainer>
          <form>
            <h3>Enter API Key </h3>
            <input type="text" name="LivepeerApiKey" onChange={handleAPIKey} />
            <div>
              <ButtonContainer>
              <Button>
                <button
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  Go Live
               
              
                </button>
                
              
                
                
              </Button>
              <Button2>
              <button
                  onClick={(e) => {
                    handleLive(e);
                  }}
                >
                 Stop Streaming
                </button>
              </Button2>
              </ButtonContainer>
              
            </div>
          </form>
          <Footer>
            <footer
              class="footer bg-dark py-3 mt-auto"
              style={{ width: "100%" }}
            >
              <Image>
                <h1>Powered by</h1>

                <img src={Livepeer} />
              </Image>
            </footer>
          </Footer>
        </FormContainer>
        <Modal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          apiKey={LivepeerApiKey}
        />
      </div>
    );
  } else {
    return (
      <>
        <h1>Not Authorised</h1>
      </>
    );
  }
}
export default StartStream;

const FormContainer = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  color: black;
  > form {
    background: #f9f9f9;
    padding: 25px;
    margin: 150px 0;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  }
  > button {
    font: 400 12px/16px "Roboto", Helvetica, Arial, sans-serif;
  }

  > h3 {
    // display: block;
    font-size: 200px;
    font-weight: 300;
    margin-bottom: 10px;
  }
  > form > input {
    border: 2px solid black;
    margin: 0 0 10px;
    min-width: 100%;
    padding: 0;
    width: 100%;
    height: 1.5rem;
    margin-top: -20px;
  }
  form > h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 27px;
  }
`;

const Button = styled.div`
  
  > button {
    cursor: pointer;
    width: 100%;
    border: none;
    background: #4caf50;
    color: #fff;
    /* margin: 0 0 5px; */
    padding: 10px;
    font-size: 15px;
    margin-top: auto;
  }
`;

const Button2=styled.div`
>button{
  cursor: pointer;
  width: 100%;
  border: none;
  background:red;
  color: #fff;
  /* margin: 0 0 5px; */
  padding: 10px;
  font-size: 15px;
  margin-top: auto;
}


`
const ButtonContainer=styled.div`
display:flex;
justify-content:space-between;
`
const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  > h1 {
    margin-right: 10px;
    font-size: 20px;
    color: white;
    font-weight: bolder;
  }
  > img {
    // border:2px solid red;
    height: 30px;
    // width:30px;
    background-color: white;
  }
`;
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > footer {
    position: fixed;
    bottom: 0;
    height: 50px;
  }
`;
