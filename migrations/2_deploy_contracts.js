var AccessToken = artifacts.require("./AccessToken.sol");


module.exports = async function(deployer) {

await deployer.deploy(AccessToken );

};
// module.exports = function(deployer) {
// };
