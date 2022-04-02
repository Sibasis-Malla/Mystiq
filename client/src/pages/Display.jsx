import React, { useEffect, useState } from "react";
import Dashboard from "../components/HomePage";
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../helpers/Firebase";
import { Link } from "react-router-dom";
import Alchemy from "../assets/Alchemy.png"
import Superfluid from "../assets/superfluid.png"
import "bootstrap/dist/css/bootstrap.min.css";
import {fUSDCxabi} from "../contracts/fUSDCx";
import BigNumber from 'bignumber.js';
import { ethers } from "ethers";



// import { database } from "../helpers/Firebase";
// import { ref, set, onValue,update,push,child } from "firebase/database";

const Display = () => {
  const [data, setData] = useState([]);
  const [balance,setBalance] = useState(0);

  
  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "data"));
      setData(querySnapshot.docs.map((doc) => doc.data()));
    })();
  }, []);
  //console.log(data);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let Bal=0;
  const fUSDCX =  new ethers.Contract(
    "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7",
    fUSDCxabi,provider
 )
 

  const  getBalance=async ()=>{

   let fUSDCxBal = await fUSDCX.balanceOf(localStorage.getItem('CurrentAccount'));
    //console.log(provider);
    const bal = new BigNumber (fUSDCxBal._hex,16)
    //console.log("FUSDCX Balance",bal.c[0]/10000)
    Bal = bal.c[0]/10000;
    setBalance(Bal);
    //console.log(balance);
  }

  useEffect(() => {
    getBalance();    
  }, [localStorage.getItem("CurrentAccount")]);
  window.ethereum.on('accountsChanged', async function (accounts) {
    
    setTimeout(setTimeout(function(){window.location.reload(false)},2000))
    
  })
  return (
    <>
    <Balance>
    
    <h1>USDCx Balance: ${balance} </h1>
    
    </Balance>
    <div style={{display:"flex",justifyContent:"flex-end", marginRight:"30px ",fontSize:"20px" }}>
    <Link to="/buy"  class="d-grid btn btn-primary mx-left"
       style={{ textDecoration: "none", color: "#FFF",fontSize:"10px" }}>TopUp USDCx</Link>
    </div>
    
   
      
    

   
    <Container>
      {data.map((data) => {
        const { name, image, address, price,teamId,tokenUri } = data;
        //console.log(name, image, address, price);
        return (
          <article>
            <Dashboard
              name={name}
              image={image}
              address={address}
              price={price}
              teamId = {teamId}
              tokenUri = {tokenUri}
            />
          </article>
        );
      })}
    </Container>
    <Footer >
    <footer class = 'footer bg-dark py-3 mt-auto' style={{width:"100%"}}>
    <Image>
    <h1>Authenticated by </h1>

    <img src={Alchemy} />

    <h1 style={{marginLeft:"20px",marginTop:"2px"}}> Transactions by </h1>

    <img src={Superfluid} />

    </Image>
    {/* <div class="container text-center">
        <span class=" text-muted " >copy Yelpcamp 2021</span>

    </div> */}

</footer>

    </Footer>
    
   

    </>
    

  );
};

export default Display;

const Balance=styled.div`
display:flex;
justify-content:flex-end;
>h1{
  font-weight:900;
  font-size:15px;
margin:20px 20px;
color:#0cc738;

}
>h2{
  font-weight:900;
  font-size:30px;
margin:20px 20px;
color:#0cc738;
}
`
const Container = styled.div`
overflow-x:hidden;
  display: grid;
  /* Umderstand the below code in the video */
  grid-template-columns: repeat(3, auto);
  // gap: 1rem -2rem;
  // padding: 3rem 1rem;
  // margin: 0.5rem 1.5px;

  // border-top: 0.2px solid gray;
  // margin-top: 1.8rem;
`;


const Image=styled.div`
display:flex;
align-items:center;
justify-content:center;
>h1{
  margin-right:10px;
  font-size:20px;
}
>img{
  // border:2px solid red;
  height:30px;
  // width:30px;
  background-color:white;
}

`
const Footer=styled.div`
 >footer{
   position:fixed;
   bottom:0;
   height:50px;
 }
  
`