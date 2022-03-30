import React, {useState,useEffect } from "react";
import AccessToken from "../contracts/AccessToken.json";
import {fUSDCxabi} from "../contracts/fUSDCx";
import { createNewFlow } from "../helpers/superfluid";
import { ethers } from "ethers";
import BigNumber from 'bignumber.js';
function Pay(props){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const [token,setToken] = useState("");
  let Bal=0;
  const Accesstoken = new ethers.Contract(
    AccessToken.networks[80001].address,
    AccessToken.abi,
    signer 
  )
  
  const fUSDCX =  new ethers.Contract(
    "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7",
    fUSDCxabi,provider
 )
 

  const  getBalance=async ()=>{

   let fUSDCxBal = await fUSDCX.balanceOf(localStorage.getItem('CurrentAccount'));

    const bal = new BigNumber (fUSDCxBal._hex,16)
    console.log("FUSDCX Balance",bal.c[0]/10000)
    Bal = bal.c[0]/10000;
  }

  const mintNFT = async()=>{
    //createNewFlow()
    const nft = await Accesstoken.CreateLicense(localStorage.getItem('CurrentAccount'),localStorage.getItem('tokenURI'),391418);
    console.log("Minting....")
    let tx = await nft.wait()
    console.log('Mined!', tx)
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()
    console.log(tokenId)
   
  }
  useEffect(() => {
    getBalance();
  }, []);
  
    return(
        <div className="App">
        <h1>Good to Go!</h1>
        <h1></h1>
        <button onClick={mintNFT}>Subscribe</button>
      </div>
    )
}
export default Pay