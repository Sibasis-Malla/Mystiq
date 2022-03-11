import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Navbar = (props) => {

  return (
    <>
      <Container>
        <ListContainer>
          <nav role="navigation">
            <ul>
              <li>
                <Link to="/creator">Creator</Link>
                <ul class="dropdown">
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
              </li>
            </ul>
          </nav>
        </ListContainer>
        <div>
          <Button onClick={props.ConnectWallet}>Metamask</Button>
        </div>
      </Container>
    </>
  );
};

export default Navbar;

const Container = styled.div`
  background-color: black;
  height: 10vh;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
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
    background: darkorange;
    list-style: none;
    margin: 0;
    padding-left: 0;
  }

  li {
    color: #fff;
    background: darkorange;
    display: block;
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
    background: orange;
    visibility: hidden;
    opacity: 0;
    min-width: 5rem;
    position: absolute;
    transition: all 0.5s ease;
    margin-top: 1rem;
    left: 0;
    display: none;
  }

  ul li:hover > ul,
  ul li ul:hover {
    visibility: visible;
    opacity: 1;
    display: block;
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
