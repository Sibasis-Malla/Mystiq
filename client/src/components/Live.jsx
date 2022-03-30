import React, { useState, useEffect } from "react";
import { fetchData } from "../helpers/livepeer";
import styled from "styled-components";
import Modal from "./Modal/Modal";
import Sidebar from "./Sidebar";
import {db} from "../helpers/Firebase";
import {doc, updateDoc} from "firebase/firestore";
import { useParams } from "react-router-dom";

const drawerWidth = 240;
function StartStream() {
  let { id } = useParams();
  const [LivepeerApiKey, setKey] = useState("");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [dat, setDat] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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

    const docRef = doc(db,'data',id);
    updateDoc(docRef, {
      live: true
    }).then(() => {
      console.log("Updated")
    })
  };
  const handleAPIKey = (event) => {
    setKey(() => ([event.target.name] = event.target.value));
  };

  return (
    <div>
      <FormContainer>
        <Sidebar />
        <form>
          <h3>Enter API Key </h3>
          <input type="text" name="LivepeerApiKey" onChange={handleAPIKey} />
          <div>
            <Button>
              <button
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Submit
              </button>
            </Button>
          </div>
        </form>
      </FormContainer>
      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        apiKey={LivepeerApiKey}
      />
    </div>
  );
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
    display: block;
    font-size: 30px;
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
`;

const Button = styled.div`
  display: flex;
  justify-content: space-between;
  > button {
    cursor: pointer;
    width: 30%;
    border: none;
    background: #4caf50;
    color: #fff;
    /* margin: 0 0 5px; */
    padding: 10px;
    font-size: 15px;
    margin-top: auto;
  }
`;
