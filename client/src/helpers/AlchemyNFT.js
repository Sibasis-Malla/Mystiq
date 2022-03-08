    import { createAlchemyWeb3 } from "@alch/alchemy-web3";


    // Replace with your Alchemy api key:
    const apiKey = "633Ea-EZaGL_M9yIRCWk5uGxNAuR1mEu";
    
    // Initialize an alchemy-web3 instance:
    const web3 = createAlchemyWeb3(
      `https://polygon-mumbai.g.alchemy.com/v2/${apiKey}`,
    );
    
    // The wallet address we want to query for NFTs:
    
    async function getlit(owner){
      const ownerAddr = owner;
    const nfts = await web3.alchemy.getNfts({
      owner: ownerAddr
    })
    const array = nfts.ownedNfts;
    console.log(array)
    const result = array.filter(element=>element.contract.address==="0x73e2937df8ccecc22e171e08ff624cd3ca002189")
    const result2 = result.filter(element=>element.id.tokenId==="0x0000000000000000000000000000000000000000000000000000000000000001")
    console.log(result)
    console.log(result2)
    }



export {getlit};
