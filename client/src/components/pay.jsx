import React, {useState,useEffect } from "react";
import AccessToken from "../contracts/AccessToken.json";
function Pay(props){
  

  
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