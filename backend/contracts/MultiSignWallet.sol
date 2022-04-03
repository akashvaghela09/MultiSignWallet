//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract MultiSignWallet {

    enum TransactionState {
        APPROVAL_PENDING,
        TRANSFER_PENDING,
        COMPLETE
    }

    struct Transaction {
        uint256 id;
        uint256 amount;
        uint256 approvedBy;   
        address payable to;
        TransactionState state;
    }

    address[] public owners;
    uint256 public threshold;
    uint256 internal totalTransaction = 0;
    mapping (address => mapping (uint256 => bool)) internal approvals;
    mapping (uint256 => Transaction) internal transactionArr;
    uint256 internal nextId = 0;

    constructor (address[] memory _owners, uint256 _threshold) public {
        owners = _owners;
        threshold = _threshold;
    }

    function addTransaction (uint256 _amount, address payable _to) public {
        transactionArr[nextId] = (Transaction(nextId, _amount, 0, _to, TransactionState.APPROVAL_PENDING));
        nextId++;
        totalTransaction++;
    }

    function getTotal() public view returns (uint256) {
        return (totalTransaction - 1);
    }

    function getTransaction (uint256 _id) public view returns (
        uint256,
        uint256,
        uint256,
        address,
        TransactionState
    ){
        return (
            transactionArr[_id].id,
            transactionArr[_id].amount,
            transactionArr[_id].approvedBy,
            transactionArr[_id].to,
            transactionArr[_id].state
        );
    }

    function approve (uint256 _id) public checkifOwner(_id) checkIfComplete(_id) {
        if(approvals[msg.sender][_id] == false){
            approvals[msg.sender][_id] = true;
            transactionArr[_id].approvedBy++;
        } else {
            revert("Already Approved!!");
        }

        if(transactionArr[_id].approvedBy >= threshold){
            transactionArr[_id].state = TransactionState.TRANSFER_PENDING;
        }
    }

    function transferAmount(uint256 _id) public checkifOwner(_id) checkIfComplete(_id) checkifApproved(_id) checkFunds(_id) payable {
        address payable to = transactionArr[_id].to;
        uint256 amount = transactionArr[_id].amount;

        to.transfer(amount);

        transactionArr[_id].state = TransactionState.COMPLETE;
    }

    modifier checkifOwner (uint _id) {
        bool isOwner = false;

        for(uint256 i = 0; i < owners.length; i++){
            if(msg.sender == owners[i]){
                isOwner = true;
                continue;
            }
        }

        require(isOwner == true, "Not an Owner!!");

        _;
    }

    modifier checkifApproved(uint256 _id){
        require(transactionArr[_id].state == TransactionState.TRANSFER_PENDING, "Still Pending For Approval!!");
        _;
    }

    modifier checkIfComplete(uint256 _id){
        if(transactionArr[_id].state == TransactionState.COMPLETE){
            revert ("Transaction Already Completed!!");
        }

        _;
    }

    modifier checkFunds (uint256 _id){
        if(msg.value > transactionArr[_id].amount){
            revert("Can't add more than required!!");
        } else if (msg.value < transactionArr[_id].amount){
            revert("Add sufficient fund amount!!");
        }

        _;
    }
}