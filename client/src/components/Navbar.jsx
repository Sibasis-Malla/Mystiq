import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Navbar = (props) => {


  return (
    <Container>
  <div>
      <Button onClick={props.ConnectWallet}>Connect Metamask</Button>
        </div>
    </Container>

     
   
   

  );
};

export default Navbar;

const Container = styled.div`
  background-color: black;
  height: 10vh;
  color: white;
  justify-content: space-around;
  align-items: center;
  font-size: 1.2rem;
`;

const Button = styled.button`
   float:right;
   margin-top:15px;
   margin-right:3px;
  background: #ff4500;
  align-items: right;
  padding: 0.25rem 0.5rem;
  border-radius: 30px;
  text-transform: capitalize;
  color: whitesmoke;
  border-color: transparent;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 10px;
  text-align: center;
  place-items:center;
`;
