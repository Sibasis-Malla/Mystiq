import React, { useState, useEffect } from "react";
import {
  createIndex,
  updateSubscription,
  distributeFunds,
} from "../helpers/superfluid";
import { database } from "../helpers/Firebase";
import { ref, set, onValue,update,push,child } from "firebase/database";
import client from "../helpers/Nft_storage";
import styled from "styled-components";
import Sidebar from "./Sidebar";


function ManageTeam() {
  const [name, setName] = useState("");
  const [membAddress, setmembId] = useState("");
  const [shares, setShares] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [members, setmemb] = useState("");
  const [counter = 0, setcounter] = useState();
  const [desc, setDesc] = useState("");

  const [ipfsHash, setIpfs] = useState("");

  const handlePrice = (event) => {
    setPrice(() => ([event.target.name] = event.target.value));
    localStorage.setItem("price", price);
    set(ref(database, "Creators/" + localStorage.getItem("CurrentAccount")), {
      price: price,
    });
  };
  const handleTeamMemb = (event) => {
    setmembId(() => ([event.target.name] = event.target.value));
  };
  const handleShares = (event) => {
    setShares(() => ([event.target.name] = event.target.value));
  };
  const handleAmount = (event) => {
    setAmount(() => ([event.target.name] = event.target.value));
  };
  const handleName = (event) => {
    setName(() => ([event.target.name] = event.target.value));
  };
  const handleDesc = (event) => {
    setDesc(() => ([event.target.name] = event.target.value));
  };
  function createTeam() {
    set(ref(database, "Creators/" + localStorage.getItem("CurrentAccount")), {
      id: localStorage.getItem("teamId"),
    });
   
  }
  function AddTeamMember() {
    push(child(
      ref(
        database,
        "Creators/" +
          localStorage.getItem("CurrentAccount") +
          "/team" 
      ),  {
        name: name,
        address: membAddress,
        shares: shares,
      }))  
  }
  const getData = () => {
    const members = ref(
      database,
      "Creators/" + localStorage.getItem("CurrentAccount") + "/team"
    );
    onValue(members, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setmemb(data);
      console.log(data);
    });
  };

  const captureFile = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    const result = await client.add(file);
    console.log(result.path);
    setIpfs(result.path);
    console.log(ipfsHash);
  };

  const createJson = async () => {
    const obj = {
      Description: desc,
      image: ipfsHash,
    };
    const objJson = JSON.stringify(obj);
    console.log(objJson);
    const result = await client.add(objJson);

    console.log(result.path);
    localStorage.setItem('tokenURI',result.path);
    set(ref(database, "Creators/" + localStorage.getItem("CurrentAccount")), {
      tokeURI: result.path,
    });
    setcounter(0);

    //console.log(result);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    createJson();
  };
  const onAdd = async(event)=>{
    event.preventDefault();
    updateSubscription(
      localStorage.getItem("teamId"),
      membAddress,
      shares
    )
    AddTeamMember()
  }

  return (
    <>
  <div><Sidebar></Sidebar></div>
      <div>
      
      
        <Button1>
          <button onClick={() => [createIndex(), createTeam()]}>
            Create CreatorID
          </button>
        </Button1>
      </div>
      <FormContainer>
        <form>
          <h3> Enter Name </h3>
          <input type="text" name="name" onChange={handleName} />

          <h3> Enter Team Member address</h3>
          <input type="text" name="membAddress" onChange={handleTeamMemb} />

          <h3> Enter number of Shares</h3>
          <input type="number" name="shares" onChange={handleShares} />
          <Button>
            <button
              onClick={onAdd}>
              
              Add member
            </button>
          </Button>
          <h3>Enter amount to be distributed in wei</h3>
          <input type="number" name="amount" onChange={handleAmount} />
          <Button>
            <button
              onClick={() =>
                // >print
                distributeFunds(localStorage.getItem("teamId"), amount)
              }
            >
              Distribute
            </button>
          </Button>
        </form>

      </FormContainer>

      <FormContainer>
        <form>
        


          <h3> Create Subscription</h3>
          <input
            type="Number"
            name="price"
            placeholder="Price"
            onChange={handlePrice}
          />

          <h3>Upload Image </h3>
          <Button>
            <input
              type="file"
              name="image"
              placeholder="Upload your Access Token image"
              onChange={captureFile}
            />
          </Button>

          <h3> Enter Description</h3>
          <input type="text" name="description" onChange={handleDesc} />

          <Button>
            <button onClick={onSubmit}>Submit</button>
          </Button>
        </form>
      </FormContainer>
  
    
    </>
  );
}
export default ManageTeam;
const FormContainer = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  position: relative;

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
  justify-content: center;
  align-items: center;
  > button {
    cursor: pointer;
    width: 50%;
    border: none;
    background: #4caf50;
    color: #fff;
    /* margin: 0 0 5px; */
    padding: 10px;
    font-size: 15px;
    margin-top: auto;
  }
`;

const Button1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > button {
    cursor: pointer;
    width: 20%;
    border: none;
    background: orange;
    color: #fff;
    /* margin: 0 0 5px; */
    padding: 10px;
    font-size: 15px;
    margin-top: 2rem;
  }
`;
