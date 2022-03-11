import React, {useState,useEffect } from "react";
import AccessToken from "../contracts/AccessToken.json";
import fUSDCxabi from "../contracts/AccessToken.json";
import { ethers } from "ethers";
import Web3 from "web3";
import { getBalance } from "@superfluid-finance/sdk-core";
function Pay(props){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const Accesstoken = new ethers.Contract(
    AccessToken.networks[80001].address,
    AccessToken.abi,
    provider 
  )
  const fUSDCX = new ethers.Contract(
    "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7",
    fUSDCxabi,
    provider
  )
  const  getBalance=async ()=>{
    const fUSDCxBal = await fUSDCX.methods.balanceOf(localStorage.getItem('CurrentAccount')).call({from: localStorage.getItem('CurrentAccount')});
    console.log(fUSDCxBal)
  }
  getBalance()
    return(
        <div className="App">
        <h1>Good to Go!</h1>
        <h1></h1>
        <button onClick={props.ConnectWallet}>Connect Metamask</button>
        <button onClick={props.createNewFlow}>Subscribe</button>
      </div>
    )
}
export default Pay