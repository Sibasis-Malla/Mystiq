import React, {useState,useEffect } from "react";
import {createIndex,updateSubscription,distributeFunds,getInfo} from "../helpers/superfluid"
import{app,database} from "../helpers/Firebase"
import {ref, set,onValue } from "firebase/database";


function ManageTeam(){
    const [name,setName] = useState("");
    const [membAddress,setmembId] = useState("");
    const [shares,setShares] = useState("");
    const [amount,setAmount] = useState("");
    const [price,setPrice] = useState("");
    const [NFT,setNFT] = useState("");
    const [members,setmemb] = useState("");
    const [counter=0,setcounter] = useState();

    const handlePrice = (event) => {
        setPrice(()=>([event.target.name] = event.target.value))
        localStorage.setItem('price',price);
       };
       const handleNFT = (event) => {
        setNFT(()=>([event.target.name] = event.target.value))

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
       const handleName = (event) => {
        setName(()=>([event.target.name] = event.target.value))
       
       };
       function createTeam(){
        set(ref(database, 'Creators/'+localStorage.getItem('CurrentAccount')), {
             id:localStorage.getItem('teamId')
            });
            setcounter(0);
          }
       function AddTeamMember(){

        set(ref(database, 'Creators/'+localStorage.getItem('CurrentAccount')+'/team/'+`${counter}`), {
          name:name,
          address:membAddress,
          shares:shares
          });
          
          setcounter(counter+1);
        }

        useEffect(() => {
            const members = ref(database, 'Creators/'+localStorage.getItem('CurrentAccount')+'/team');
            onValue(members, (snapshot) => {
            const data = snapshot.val();
             console.log(data)
              setmemb(data);
              console.log(data)
            });
          }, []);

   
    return( 
    <div>
        <div>                
            <button onClick={(event)=>[createIndex() , createTeam()]}>Create Team</button>
         
        </div>
        <div name="Add Member">
            <div >
                Enter Name
                <input  type="text" name="name" onChange={handleName}/>
            </div>
            <div>
                Enter Team Member address
                <input type="text" name="membAddress" onChange={handleTeamMemb} />
            </div>
            <div>
                Enter number of Shares
                <input type="number" name="shares" onChange={handleShares} />
            </div>
            <button onClick={/*()=>updateSubscription(teamId,membAddress,shares)*/AddTeamMember}> Add member</button>
       
        </div>
        <div name="Send Funds">
            <div>
                Enter amount to be distributed in wei
                <input type="number" name="amount" onChange={handleAmount}/>
                <button onClick={AddTeamMember}>Distribute</button>
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