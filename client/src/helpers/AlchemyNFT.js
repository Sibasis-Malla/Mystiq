    import { createAlchemyWeb3 } from "@alch/alchemy-web3";


    // Replace with your Alchemy api key:
    const apiKey = "633Ea-EZaGL_M9yIRCWk5uGxNAuR1mEu";
    
    // Initialize an alchemy-web3 instance:
    const web3 = createAlchemyWeb3(
      `https://polygon-mumbai.g.alchemy.com/v2/${apiKey}`,
    );
    
    // The wallet address we want to query for NFTs:
    
    export default async(owner,teamId) => {
      const ownerAddr = owner;
    const nfts = await web3.alchemy.getNfts({
      owner: ownerAddr
    })
    const array = nfts.ownedNfts;
  
    let count = 0;
    function auth(item){
      for(let i=0;i<item.length;i++){
       // console.log(Math.trunc(Number(item[i].id.tokenId)/10000000) )
        //console.log(item[i].contract.address)
        if(item[i].contract.address === "0x3a142dffefd8ceab39f15f3ffbd091bfbc2c892e" && Math.trunc(Number(item[i].id.tokenId)/10000000) === Number(teamId)){
         // console.log("Hey")
          count = count+1;
          //console.log(count)
          break;
        }
      }
    }
    auth(array);
    return count;
}

