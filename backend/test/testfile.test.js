const MultiSignWallet = artifacts.require("MultiSignWallet");   //Contract Name
const { expectRevert } = require("@openzeppelin/test-helpers");

contract("MultiSignWallet Contract Testing", async (accounts) => {
    let MultiSignWalletInstance;

    beforeEach(async () => {
        MultiSignWalletInstance = await MultiSignWallet.new([accounts[0], accounts[1], accounts[2]], 2);
    })

	describe("Initial state test cases ::", () => {
        it('Should be able to get Owners address', async () => {
            let owners = await MultiSignWalletInstance.owners(0);
            // console.log(owners);
        });

        it('Should be able to get Threshold', async () => {
            let threshold = await MultiSignWalletInstance.threshold();
            // console.log(threshold.toString());
        });
    })

    describe("Add & Approve Transaction test cases ::", () => {
        it('Should be able to add Transaction', async () => {
            let tx = await MultiSignWalletInstance.addTransaction(1000, accounts[3]);
        })

        it('Should be able to get Transaction', async () => {
            let tx = await MultiSignWalletInstance.addTransaction(1000, accounts[3]);
            let txZero = await MultiSignWalletInstance.getTransaction(0);
        })

        it('Should be able to approve Transaction', async () => {
            await MultiSignWalletInstance.addTransaction(1000, accounts[3]);
            await MultiSignWalletInstance.approve(0);
        })

        it('Revert on approve Transaction if not an owner', async () => {
            await MultiSignWalletInstance.addTransaction(1000, accounts[3]);
            await expectRevert( MultiSignWalletInstance.approve(0, {from: accounts[4]}), "Not an Owner!!")
        })

        it('Revert on approve Transaction if Already approved', async () => {
            await MultiSignWalletInstance.addTransaction(1000, accounts[3]);
            await MultiSignWalletInstance.approve(0);
            await expectRevert(MultiSignWalletInstance.approve(0), "Already Approved!!")
        })

        it('Revert on approve Transaction if Already Complete', async () => {
            await MultiSignWalletInstance.addTransaction(1000, accounts[3]);
            await MultiSignWalletInstance.approve(0);
            await MultiSignWalletInstance.approve(0, {from: accounts[1]});
            await MultiSignWalletInstance.transferAmount(0, {value: 1000});
            await expectRevert(MultiSignWalletInstance.approve(0), "Transaction Already Completed!!")
        })
    })

    describe("Transfer Transaction Fund test cases ::", () => {
        it('Should be able to Transfer Transaction Fund', async () => {
            await MultiSignWalletInstance.addTransaction(1000, accounts[3]);
            await MultiSignWalletInstance.approve(0);
            await MultiSignWalletInstance.approve(0, {from: accounts[1]});
            await MultiSignWalletInstance.transferAmount(0, {value: 1000});
        })

        it('Revert on Transfer Transaction Fund if not an owner', async () => {
            await MultiSignWalletInstance.addTransaction(1000, accounts[3]);
            await MultiSignWalletInstance.approve(0);
            await MultiSignWalletInstance.approve(0, {from: accounts[1]});
            await expectRevert(MultiSignWalletInstance.transferAmount(0, {from: accounts[4], value: 1000}), "Not an Owner!!")
        })

        it('Revert on Transfer Transaction if Pending for Approval', async () => {
            await MultiSignWalletInstance.addTransaction(1000, accounts[3]);
            await MultiSignWalletInstance.approve(0);
            await expectRevert(MultiSignWalletInstance.transferAmount(0, {value: 1000}), "Still Pending For Approval!!")
        })

        it('Revert on Transfer Transaction if Already Complete', async () => {
            await MultiSignWalletInstance.addTransaction(1000, accounts[3]);
            await MultiSignWalletInstance.approve(0);
            await MultiSignWalletInstance.approve(0, {from: accounts[1]});
            await MultiSignWalletInstance.transferAmount(0, {value: 1000});
            await expectRevert(MultiSignWalletInstance.transferAmount(0, {value: 1000}), "Transaction Already Completed!!")
        })

        it('Revert on Transfer Transaction if Fund is more than required', async () => {
            await MultiSignWalletInstance.addTransaction(1000, accounts[3]);
            await MultiSignWalletInstance.approve(0);
            await MultiSignWalletInstance.approve(0, {from: accounts[1]});
            await expectRevert(MultiSignWalletInstance.transferAmount(0, {value: 2000}), "Can't add more than required!!")
        })

        it('Revert on Transfer Transaction if Fund is less than required', async () => {
            await MultiSignWalletInstance.addTransaction(1000, accounts[3]);
            await MultiSignWalletInstance.approve(0);
            await MultiSignWalletInstance.approve(0, {from: accounts[1]});
            await expectRevert(MultiSignWalletInstance.transferAmount(0, {value: 200}), "Add sufficient fund amount!!")
        })
    })
})