import React, {useState,useEffect } from "react";
import {createIndex,updateSubscription,distributeFunds,getInfo} from "../helpers/superfluid"
import{app,database} from "../helpers/Firebase"
import {ref, set,onValue } from "firebase/database";
import client from "../helpers/Nft_storage"


function ManageTeam(){
    const [name,setName] = useState("");
    const [membAddress,setmembId] = useState("");
    const [shares,setShares] = useState("");
    const [amount,setAmount] = useState("");
    const [price,setPrice] = useState("");
    const [members,setmemb] = useState("");
    const [counter=0,setcounter] = useState();
    const[desc,setDesc] = useState("");

    const [ipfsHash,setIpfs] = useState("");

  
    const handlePrice = (event) => {
        setPrice(()=>([event.target.name] = event.target.value))
        localStorage.setItem('price',price);
        set(ref(database, 'Creators/'+localStorage.getItem('CurrentAccount')), {
            price:price
           });
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
       const handleDesc = (event)=>{
           setDesc(()=>([event.target.name] = event.target.value))
       }
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
    const getData = ()=>{
            const members = ref(database, 'Creators/'+localStorage.getItem('CurrentAccount')+'/team');
            onValue(members, (snapshot) => {
            const data = snapshot.val();
             console.log(data)
              setmemb(data);
              console.log(data)
            })
    }


          
 const captureFile = async(event) => {

    const file = event.target.files[0];
        console.log(file)
        const result = await client.add(file);
        console.log(result.path);
       setIpfs( result.path );
        console.log(ipfsHash);  
  
  };

  const createJson = async () => {
    const obj = {
     
      Description: desc,
      image : ipfsHash
      
    };
    const objJson = JSON.stringify(obj);
    console.log(objJson)
    const result = await client.add(objJson);
    
    console.log(result.path);
    set(ref(database, 'Creators/'+localStorage.getItem('CurrentAccount')), {
        tokeURI:result.path
       });
       setcounter(0);
   
    //console.log(result);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    createJson();
   
  };
   
    return( 
    <div>
        <div>                
            <button onClick={(event)=>[createIndex() , createTeam()]}>Create CreatorID</button>
         
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
            <button onClick={()=>updateSubscription(localStorage.getItem('teamId'),membAddress,shares)/*AddTeamMember*/}> Add member</button>
       
        </div>
        <div name="Send Funds">
            <div>
                Enter amount to be distributed in wei
                <input type="number" name="amount" onChange={handleAmount}/>
                <button onClick={()=>distributeFunds(localStorage.getItem('teamId'),amount)}>Distribute</button>
            </div>


        </div>
            <div>
                Create Subscription
                <input type="Number" name="price"  placeholder="Price" onChange={handlePrice}/>
            </div>
        
        <div>
            Upload Image
            <input type="file" name="image" placeholder="Upload your Access Token image" onChange={captureFile}/>
        </div>
        <div>
            Enter Description
            <input type="text" name="description" onChange={handleDesc}/>
        </div>
        <div>
            <button onClick={onSubmit}>Submit</button>
        </div>

    </div>
    )
}
export  default ManageTeam