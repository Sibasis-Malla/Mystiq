import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Player from "./components/Viewer";
import Pay from "./components/pay";
import StartStream from "./components/Live";
import ManageTeam from "./components/CreatorTeam";
import data from "./pages/data";
import { getlit } from "./helpers/AlchemyNFT";
import UploadVideo from "./components/Upload"

import "./App.css";
import Display from "./pages/Display";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
 

  

  const [Currentaccount, setCurrentAccount] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
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
      localStorage.setItem("CurrentAccount", account);
      getlit(localStorage.getItem('CurrentAccount'));
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

      <Navbar ConnectWallet={connectWallet}/>

      <Routes>
        <Route path="/" element={<Display />} />

        <Route
          path="/Pay"
          element={
            <Pay
            />
          }
        />

        <Route
          path="/stream"
          element={<Player playbackId={localStorage.getItem("playbackId")} />}
        />
        <Route path="/live" element={<StartStream />} />
        <Route path="/creator/team" element={<ManageTeam />} />
        <Route path="/Upload" element={<UploadVideo/>} />
        <Route path="/Creator" element={<Sidebar/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
