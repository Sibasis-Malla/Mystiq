
import { Framework,SuperToken } from "@superfluid-finance/sdk-core";
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

const ETHx = "0x6fC99F5591b51583ba15A8C2572408257A1D2797";

const createNewFlow= async ()=> {

   
  
    try {
      const createFlowOperation = sf.cfaV1.createFlow({
        receiver: '0x721d8574379BF9bB88a4Ca3442cCE095556279A7',
        flowRate: '385802469135802',
        superToken: ETHx
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
        superToken: ETHx
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
      superToken: ETHx
      // userData?: string
    });

    console.log("Creating your Index...");

    await createIndexOperation.exec(signer);

    console.log(
      `Congrats - you've just created a new Index!
       Super Token: ETHx
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
    superToken: ETHx,
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
      superToken: ETHx,
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

const readTokens = async(_sender)=>{
  const fUSDCx = await new SuperToken.create({
    id: "0x42bb40bf79730451b11f6de1cba222f17b87afd7",
    isListed: true,
    name: "Super fUSDC Fake Token",
    symbol: "fUSDCx",
    underlyingTokenAddress: "0xbe49ac1eadac65dccf204d4df81d650b50122ab2",
    
  })
  const results = await fUSDCx.realtimeBalanceOf({
    providerOrSigner:provider,
     account:_sender,
     timestamp:new Date().getTime()
  }

    )
    console.log(results)
  }
  
  export  {createNewFlow,StopFlow,createIndex,updateSubscription,distributeFunds,getInfo,readTokens}
