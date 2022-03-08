pragma solidity ^0.8.7;
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";



contract AccessToken is ERC721 {
    uint256 counter;
    mapping (uint256 => string) private _tokenURIs;

    constructor()  ERC721("Mystiq", "Myst") {

    }
    event TokenURI(string tokenuri);

    function _setTokenURI(uint256 tokenId,string memory tokenURI)internal virtual{
        _tokenURIs[tokenId] = tokenURI;

    }
    function CreateLicense(address artist, string memory tokenURI,uint256 creatorCode)public returns(uint256)
    {
        uint256 newItemId = creatorCode * 10000000 +counter;
        _safeMint(artist, newItemId);
        _setTokenURI(newItemId, tokenURI);
        counter++;
        emit TokenURI(tokenURI);

        return newItemId;
    }
}