import React, { useState, useEffect } from "react";
import {
  createIndex,
  updateSubscription,
  distributeFunds,
} from "../helpers/superfluid";
import { database } from "../helpers/Firebase";
import styled from "styled-components";
import Sidebar from "./Sidebar";



function ManageTeam() {

  const [membAddress, setmembId] = useState("");
  const [shares, setShares] = useState("");
  const [amount, setAmount] = useState("");
  
 

 

 
  const handleTeamMemb = (event) => {
    setmembId(() => ([event.target.name] = event.target.value));
  };
  const handleShares = (event) => {
    setShares(() => ([event.target.name] = event.target.value));
  };
  const handleAmount = (event) => {
    setAmount(() => ([event.target.name] = event.target.value));
  };


 


 
  const onAdd = async(event)=>{
    event.preventDefault();
    updateSubscription(
      localStorage.getItem("teamId"),
      membAddress,
      shares
    )
   
  }

  return (
    <>
  <div><Sidebar></Sidebar></div>
      <FormContainer>
        <form>
          

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

   
    
    </>
  );
}
export default ManageTeam;
const FormContainer = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  color:black;

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
