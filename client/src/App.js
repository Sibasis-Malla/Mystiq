import React, {useState,useEffect } from "react";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Player from "./components/Viewer";
import Pay from "./components/pay";
import StartStream from "./components/CreatorDashboard";
import ManageTeam from "./components/CreatorTeam";
import {fetchData,lst} from "./livepeer";
import {getlit} from "./AlchemyNFT";
import {createNewFlow,StopFlow,readTokens,getInfo} from "./superfluid"
import "./App.css";

function App  () {  
  getInfo()
 

  const [LivepeerApiKey,setKey] = useState("");
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
    const auth = getlit(Currentaccount);
    console.log(auth);

    const accounts = await ethereum.request({ method: "eth_accounts" });
    const chain = await window.ethereum.request({ method: "eth_chainId" });
    let chainId = chain;
    console.log("chain ID:", chain);
    console.log("global Chain Id:", chainId);
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);


const handleSubmit = async (event)=>{
  event.preventDefault();
  console.log(LivepeerApiKey)
  fetchData(LivepeerApiKey)  
}
const handleAPIKey = (event) => {
 setKey(()=>([event.target.name] = event.target.value))
 console.log(LivepeerApiKey)
};

const showData=(event)=>{
  event.preventDefault();
  console.log(lst[0].data.streamKey)
  localStorage.setItem('streamKey',lst[0].data.streamKey)
 localStorage.setItem('playbackId',lst[0].data.playbackId)
}

    return (
      <Router>
        <Routes>
        <Route path = "/Pay"
          element ={
          <Pay
          ConnectWallet = {connectWallet}
          createNewFlow = {()=>createNewFlow()}
          StopFlow = {()=>StopFlow(Currentaccount)}
          read = {()=>readTokens(Currentaccount)}
          />}/>
      
      <Route path='/stream'
        element= {<Player
        playbackId = {localStorage.getItem('playbackId')}
         />}/>
        <Route path='/creator'
        element ={
          <StartStream
          handC = {handleAPIKey}
          submit={handleSubmit}
          show={showData}
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
