import React, { useState,useEffect } from "react";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import {fUSDCxabi} from "../contracts/fUSDCx";
import {ERC20abi} from "../contracts/ERC20abi";
import styled from "styled-components";
import Superfluid from "../assets/superfluid.png"
import BigNumber from 'bignumber.js';



let chainId=null;
let sf = null;
const provider = window.ethereum&&new ethers.providers.Web3Provider(window.ethereum);
  
const signer = provider && provider.getSigner();


const getInfo = async()=>{

 chainId = await window.ethereum.request({ method: "eth_chainId" });
 sf = await Framework.create({
  chainId: Number(chainId),
  provider: provider
});
}

async function bgtApprove(amt) {
  await getInfo();


  const fUSDC =  new ethers.Contract(
    "0xbe49ac1EadAc65dccf204D4Df81d650B50122aB2",
    ERC20abi,signer
 )
 
  try {
    console.log("approving BGT spend");
    await fUSDC.approve(
        "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7",
      ethers.utils.parseEther(amt.toString())
    ).then(function (tx) {
      console.log(
        `Congrats, you just approved your DAI spend. `
      );
    });
  } catch (error) {
    console.error(error);
  }
}

//where the Superfluid logic takes place

async function bgtUpgrade(amt) {
   await getInfo()

  const fUSDCx = await sf.loadSuperToken(
    "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7"
  );

  try {
    console.log(`upgrading ${amt} fusd to fusdx`);
    const amtToUpgrade = ethers.utils.parseEther(amt.toString());
    //const amtToUpgrade = amt;
    console.log(amtToUpgrade.toString())
    const upgradeOperation = fUSDCx.upgrade({
      amount: amtToUpgrade.toString()
  
    });
    const upgradeTxn = await upgradeOperation.exec(signer);
    await upgradeTxn.wait().then(function (tx) {
    });
  } catch (error) {
    console.error(error);
  }
}
const Upgrade = () => {
  const [amount, setAmount] = useState("");
  const [balance,setBalance] = useState(0);
  const fUSDCX =  new ethers.Contract(
    "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7",
    fUSDCxabi,provider
 )
  let Bal = 0;
  const  getBalance=async ()=>{

    let fUSDCxBal = await fUSDCX.balanceOf(localStorage.getItem('CurrentAccount'));
     console.log(provider);
     const bal = new BigNumber (fUSDCxBal._hex,16)
     console.log("FUSDCX Balance",bal.c[0]/10000)
     Bal = bal.c[0]/10000;
     setBalance(Bal);
     console.log(balance);
   }
   useEffect(() => {
     getBalance();
     
   }, []);


  const handleAmountChange = (e) => {
    setAmount(() => ([e.target.name] = e.target.value));
  };
  const handleSubmit = async (e) => {
    await bgtApprove(amount)
    alert("Congrats, you just approved your USDC spend.")

  };
  const handleSubmit2 = async (e) => {
    await bgtUpgrade(amount);
    alert(`Congratulations!${amount} has been credited`)
    setTimeout(window.location.reload(false),1000)
 
  };


  return (
      <>
    <Balance>
    
    <h1>USDCx Balance: ${balance} </h1>
    
    </Balance>
    <form>
        <div className="container-fluid col-md-6">
          <h2 className="d-flex justify-content-center my-2">Upgrade to USDCx </h2>
          <div className="mb-3">
            <div className=" mb-3">
            <input
              name="amount"
              onChange={handleAmountChange}
              value={amount}
              type="number"
              className="form-control"
              id="amount"
              placeholder="Enter Amount in Dollars to upgrade"
            />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="d-grid btn btn-success my-3 col-2 mx-auto"
            >
              Approve
            </button>
          </div>
          <div>
          <button
              type="button"
              onClick={handleSubmit2}
              className="d-grid btn btn-success my-3 col-2 mx-auto"
            >
              Upgrade
            </button>
          </div>
        </div>
      </form>
      <Footer >
    <footer class = 'footer bg-dark py-3 mt-auto' style={{width:"100%"}}>
    <Image>

    <h1 style={{marginLeft:"5px"}}> Transactions by </h1>

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
const Balance=styled.div`
display:flex;
justify-content:flex-end;
>h1{
  font-weight:900;
  font-size:30px;
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
export default Upgrade
