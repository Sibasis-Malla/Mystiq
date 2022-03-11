import React, {useState,useEffect } from "react";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Player from "./components/Viewer";
import Pay from "./components/pay";
import StartStream from "./components/CreatorDashboard";
import ManageTeam from "./components/CreatorTeam";
import {getlit} from "./helpers/AlchemyNFT";
import {createNewFlow,StopFlow,getInfo} from "./helpers/superfluid"
import "./App.css";

function App  () {  
  //getInfo()
 


  const [Currentaccount,setCurrentAccount] = useState("");
 
 

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts"
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }
   
   

    const accounts = await ethereum.request({ method: "eth_accounts" });
    const chain = await window.ethereum.request({ method: "eth_chainId" });
    let chainId = chain;
    console.log("chain ID:", chain);
    console.log("global Chain Id:", chainId);
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
      localStorage.setItem('CurrentAccount',account);
    } else {
      console.log("No authorized account found");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  //getlit(Currentaccount)

    return (
      <Router>
        <Routes>
        <Route path = "/Pay"
          element ={
          <Pay
          ConnectWallet = {connectWallet}
          createNewFlow = {()=>createNewFlow()}
          StopFlow = {()=>StopFlow(Currentaccount)}
          />}/>
      
      <Route path='/stream'
        element= {<Player
        playbackId = {localStorage.getItem('playbackId')}
         />}/>
        <Route path='/creator'
        element ={
          <StartStream
          />
        }
        />
        <Route path='/creator/team'
        element ={
          <ManageTeam
          />
        }
        />
      </Routes>
      </Router>

    );
  }


export default App;
