   import { useState } from "react";
    import { createAlchemyWeb3 } from "@alch/alchemy-web3";


    // Replace with your Alchemy api key:
    const apiKey = "mQmfG5w4UTh8ft6IkmKWSxocKB3jbf8C";
    
    // Initialize an alchemy-web3 instance:
    const web3 = createAlchemyWeb3(
      `https://eth-rinkeby.alchemyapi.io/v2/${apiKey}`,
    );
    
    // The wallet address we want to query for NFTs:
    
    async function getlit(owner){
      const ownerAddr = owner;
    const nfts = await web3.alchemy.getNfts({
      owner: ownerAddr
    })
    const array = nfts.ownedNfts;
    const result = array.filter(element=>element.address="0x73E2937df8ccEcc22E171E08fF624cd3Ca002189")
    console.log(result)
    }



export {getlit};
