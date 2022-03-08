import React, {useState,useEffect } from "react";
function Pay(props){
  
    return(
        <div className="App">
        <h1>Good to Go!</h1>
        <h1></h1>
        <button onClick={props.ConnectWallet}>Connect Metamask</button>
        <button onClick={props.createNewFlow}>Stream</button>
        <button onClick={props.StopFlow}>Stop</button>
        <button onClick={props.read}>Read</button>
      </div>
    )
}
export default Pay