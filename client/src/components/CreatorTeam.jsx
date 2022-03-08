import React, {useState,useEffect } from "react";
import {createIndex,updateSubscription,distributeFunds,getInfo} from "../superfluid"



function ManageTeam(){
    const [teamId,setTeamId] = useState("");
    const [membAddress,setmembId] = useState("");
    const [shares,setShares] = useState("");
    const [amount,setAmount] = useState("");
    const [price,setPrice] = useState("");
    const [NFT,setNFT] = useState("");

    const handlePrice = (event) => {
        setPrice(()=>([event.target.name] = event.target.value))
        localStorage.setItem('price',price);
       };
       const handleNFT = (event) => {
        setNFT(()=>([event.target.name] = event.target.value))

       };

    const handleTeamId = (event) => {
        setTeamId(()=>([event.target.name] = event.target.value))
        
       };
    const handleTeamMemb = (event) => {
        setmembId(()=>([event.target.name] = event.target.value))
        
       };
       const handleShares = (event) => {
        setShares(()=>([event.target.name] = event.target.value))
       
       };
       const handleAmount = (event) => {
        setAmount(()=>([event.target.name] = event.target.value))
       
       };
       

   
    return( 
    <div>
        <div>                
            <button onClick={createIndex}>Create Team</button>
         
        </div>
        <div name="Add Member">
            <div >
                Enter Team Id
                <input  type="number" name="teamId" onChange={handleTeamId}/>
            </div>
            <div>
                Enter Team Member address
                <input type="text" name="membAddress" onChange={handleTeamMemb} />
            </div>
            <div>
                Enter number of Shares
                <input type="number" name="shares" onChange={handleShares} />
            </div>
            <button onClick={()=>updateSubscription(teamId,membAddress,shares)}> Add member</button>
        </div>
        <div name="Send Funds">
        <div >
                Enter Team Id
                <input  type="number" name="teamId" onChange={handleTeamId}/>
            </div>
            <div>
                Enter amount to be distributed in wei
                <input type="number" name="amount" onChange={handleAmount}/>
                <button onClick={()=>distributeFunds(teamId,amount)}>Distribute</button>
            </div>


        </div>
        <div>
            <div>
                Create Subscription
                <input type="Number" name="price"  placeholder="Price" onChange={handlePrice}/>
            </div>
            <div>
                <input type="text" name="NFT" placeholder="Enter Access NFT token Address" onChange={handleNFT}/>
            </div>
            <button onClick={localStorage.setItem('NFT',NFT)}>Create</button>
        </div>

    </div>
    )
}
export  default ManageTeam