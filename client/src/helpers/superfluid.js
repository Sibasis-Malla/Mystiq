
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
let chainId=null;
let sf = null;
const provider = new ethers.providers.Web3Provider(window.ethereum);
  
const signer = provider.getSigner();


const getInfo = async()=>{

 chainId = await window.ethereum.request({ method: "eth_chainId" });
 sf = await Framework.create({
  chainId: Number(chainId),
  provider: provider
});
}

const fUSDCx = "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7";

const createNewFlow= async ()=> {

   
  
    try {
      const createFlowOperation = sf.cfaV1.createFlow({
        receiver: '0xA080c1d469936774489A94b2f404A5a1FeAAddA1',
        flowRate: '3858024691358',
        superToken: fUSDCx
        // userData?: string
      });
  
      console.log("Creating your stream...");
      const result = await createFlowOperation.exec(signer);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

 const StopFlow= async (_sender)=> {

   
    try {
      const StopFlowOperation = sf.cfaV1.deleteFlow({
        sender:_sender,
        receiver: '0x721d8574379BF9bB88a4Ca3442cCE095556279A7',
        superToken: fUSDCx
        // userData?: string
      });
  
  
      console.log("Stopping your stream...");
      const result = await StopFlowOperation.exec(signer);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  const id = Math.floor(100000 + Math.random() * 900000);//6 digits
  const createIndex = async()=>{
  try {
    
  
    const createIndexOperation = sf.idaV1.createIndex({
      indexId: id,
      superToken: fUSDCx
      // userData?: string
    });

    console.log("Creating your Index...");

    await createIndexOperation.exec(signer);
    localStorage.setItem('teamId',id)

    console.log(
      `Congrats - you've just created a new Index!
       Super Token: fUSDCx
       Index ID: ${id}
    `
    );
    
  } catch (error) {
    console.error(error);
  }
}
const updateSubscription =async(_id,address,shares)=>{
try {
  const updateSubscriptionOperation = sf.idaV1.updateSubscriptionUnits({
    indexId: _id,
    superToken: fUSDCx,
    subscriber: address,
    units: shares
    // userData?: string
  });

  console.log("Updating your Index...");

  await updateSubscriptionOperation.exec(signer);

  console.log(
    `Congrats - you've just updated an Index!
     Index ID: ${_id}
     Subscriber: ${address}
     Units: ${shares} units
  `
  );
} catch (error) {
  console.error(error);
}

}

const distributeFunds = async(id_,amount)=>{
  try {
    const distributeOperation = sf.idaV1.distribute({
      indexId: id_,
      superToken: fUSDCx,
      amount: amount
      // userData?: string
    });

    console.log("Distributing funds to your index subscribers...");

    await distributeOperation.exec(signer);

    console.log(
      `Congrats - you've just sent funds to your index!
       Index ID: ${id_}
       Total Sent: ${amount}
    `
    );
  } catch (error) {
    console.error(error);
  }
}


  
  export  {createNewFlow,StopFlow,createIndex,updateSubscription,distributeFunds,getInfo}
