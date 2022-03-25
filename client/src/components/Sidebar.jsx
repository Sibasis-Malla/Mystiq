import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  const [Currentaccount, setCurrentAccount] = useState("");
  const [isCreator,setCreator] = useState(false);

  const AuthenticateOwner = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
      console.log("check")
      console.log()
      if( account ===  localStorage.getItem("CurrentCreator").toLowerCase() ){
        setCreator(true);
        console.log(setCreator)
      }
 
    } else {
      console.log("No authorized account found");
    }
  };
 
  useEffect(() => {
    AuthenticateOwner();
  }, []);
  



  return (
    <div >{isCreator?

      <Container>
        <ListContainer>
          <nav role="navigation">
            <ul>
              <li>
                    <Link to="/creator/team">Team</Link>
                  </li>
                  <li>
                    <Link to="/live">Go live</Link>
                  </li>
                  <li>
                    <Link to="/upload">Upload Video</Link>
                  </li>
              
             
            </ul>
          </nav>
        </ListContainer>
      </Container> 

      
:""}

      </div>



  )

}
export default Sidebar;

const Container = styled.div`
  background-color: rgb(3,9,40);
  height: 100vh;
  width:150px;
  color: white;
  display: inline-block;
  font-size: 1.2rem;
`;

const ListContainer = styled.div`
  a {
    text-decoration: none;
  }

  nav {
    font-family: monospace;
  }

  ul {
    background: rgb(3,9,40);
    width:100%
    list-style: none;
    margin: 0;
    padding-left: 0;
  }

  li {
    color: #fff;
    background-color: rgb(3,9,40);
    display: flex;
    float: left;
    padding: 1rem;
    position: relative;
    text-decoration: none;
    transition-duration: 0.5s;
  }

  li a {
    color: #fff;
  }

  li:hover {
    background: red;
    cursor: pointer;
  }

  ul li ul {
    background-color: ;
    visibility: hidden;
    opacity: 0;
    min-width: 5rem;
    position: center;
    transition: all 0.5s ease;
    margin-top: 1rem;
    left: 0;
    display: flex;
  }

  ul li:hover > ul,
  ul li ul:hover {
    visibility: visible;
    opacity: 1;
    display: flex;
  }

  ul li ul li {
    clear: both;
    width: 100%;
  }
`;

const Button = styled.button`
  background: #ff4500;
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 30px;
  text-transform: capitalize;
  color: whitesmoke;
  border-color: transparent;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 10px;
  margin: 2rem auto;
  text-align: center;
  display: grid;
  place-items: center;
`;
