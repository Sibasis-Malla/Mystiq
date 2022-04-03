import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = (props) => {
  return (
    // <Container>
    //   <div>
    //     {/* <h1 style={{ color: "white" }}>MyStiq</h1> */}

    //     <Button onClick={props.ConnectWallet}>Connect Metamask</Button>

    //     <Link to="/">
    //       <h1 style={{ color: "white",fontWeight:"900" }}>MyStiq</h1>
    //     </Link>

    //     <Link to="/signup">
    //      <Button2>
    //      Sign Up
    //        </Button2>
    //     </Link>
    //   </div>
    // </Container>
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <Container>
          <Link to="/">
          <h1 style={{ color: "white" }}>MyStiq</h1>
          </Link>
          <Container2>
          <Button onClick={props.ConnectWallet}>Connect Metamask</Button>
          <Link to="/signup">
            <Button2>Sign Up</Button2>
          </Link>
          </Container2>
          
        </Container>
      </nav>
    </>
  );
};

export default Navbar;

const Container = styled.div`
  // position:relative;
  // top:-10px;
  // background-color: black;
  // height: 10vh;
  // color: white;
  // justify-content: space-between;
  // align-items: center;
  // font-size: 1.2rem;


   >a{
     text-decoration:none;
   }
   >a>h1{
     margin-left:250px;
     font-weight:bolder;
   }
`;


const Container2=styled.div`
position:absolute;
right:0;
top:0;
`

const Button = styled.button`
  float: right;
  margin-top: 10px;
  margin-right: 3px;
  background: #ff4500;
  align-items: right;
  // padding: 0.25rem 0.5rem;
  border-radius: 30px;
  text-transform: capitalize;
  color: whitesmoke;
  border-color: transparent;
  cursor: pointer;
  font-size: 1rem;
  padding: 10px;
  text-align: center;
  place-items: center;
`;

const Button2 = styled.div`
  float: right;
  margin-top: 10px;
  margin-right: 3px;
  background: black;
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
  place-items: center;
`;
