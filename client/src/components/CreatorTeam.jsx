import React, { useState, useEffect } from "react";
import {
  createIndex,
  updateSubscription,
  distributeFunds,
} from "../helpers/superfluid";
import { database } from "../helpers/Firebase";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Superfluid from "../assets/superfluid.png"


function ManageTeam() {
  window.ethereum.on('accountsChanged', function (accounts) {
    setTimeout(window.location.reload(false),5000)
  })
  

  const [membAddress, setmembId] = useState("");
  const [shares, setShares] = useState("");
  const [amount, setAmount] = useState("");
  
 

  const [isAuth, setAuth] = useState(false);
  useEffect(() => {
    if (
      localStorage.getItem("CurrentCreator").toLowerCase() === localStorage.getItem("CurrentAccount").toLowerCase()
    ) {
      setAuth(true);
    }
  }, []);

 
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
  if (isAuth) {

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
        <Footer >
    <footer class = 'footer bg-dark py-3 mt-auto' style={{width:"100%"}}>
    <Image>
    <h1>Powered by</h1>

    <img src={Superfluid} />

    </Image>
    

</footer>

    </Footer>
      </FormContainer>

   
    
    </>
  );
} else {
  return (
    <>
      <h1>Not Authorised</h1>
    </>
  );
}
}
export default ManageTeam;


const FormContainer = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  position: relative;

  color:black;
  margin-top:100px;
  > form {
    background: #f9f9f9;
    padding: 25px;
    margin: 150px 0;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
   margin-top:-10px;


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
    margin-bottom:20px;


  }
  >form>h3{
    display: flex;
    justify-content: center;
    align-items:center;
    font-size:22px;
    margin-bottom:10px;
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
    margin-bottom:20px;

  }
  
`
const Image=styled.div`
display:flex;
align-items:center;
justify-content:center;
>h1{
  margin-right:10px;
  font-size:20px;
color:white;
font-weight:bolder;

}
>img{
  // border:2px solid red;
  height:30px;
  // width:30px;
  background-color:white;
}

`
const Footer=styled.div`
display:flex;
align-items:center;
justify-content:center;

 >footer{
   position:fixed;
   bottom:0;
   height:50px;
 }
  
`

