const { ethers } = require("hardhat");

async function main() {
    const MultiSignWallet = await ethers.getContractFactory(
        "MultiSignWallet"   // Contract Name
    );

    // Create new instance
    const newMultiSignWallet = await MultiSignWallet.deploy(["0x5924bc75B38621377c2FbF6b7a4E804CadBF620c", "0xbd426704F3881e3106081d3Cef83658FDac08Bf7", "0x51E821EE92486EfbaE1A63b2da3f75546084c6B8"], 2)

    await newMultiSignWallet.deployed();
    console.log("Success, Contract Deployed: ", newMultiSignWallet.address);
}

main()
.then(() => {
    process.exit(0)
})
.catch((err) => {
    console.error(err);
    process.exit(1);
})