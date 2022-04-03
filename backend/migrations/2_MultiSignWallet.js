const MultiSignWallet = artifacts.require("MultiSignWallet");

module.exports = async function (deployer, _network, accounts) {
  await deployer.deploy(MultiSignWallet, [accounts[0], accounts[1], accounts[2]], 2);
  const MultiSignWalletInstance = await MultiSignWallet.deployed()
};
