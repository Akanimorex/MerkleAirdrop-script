// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Faucet {
    address payable public owner;

    constructor(){
        owner =  payable(msg.sender);
    }

    function withdraw(uint256 _amount) external payable {
        require(msg.sender != address(0),"can't send to address zero");
        require(_amount <= 100000000000000000); //user can only withdraw 0.1eth at a time

        (bool success,) = msg.sender.call{value:_amount}("");

        require(success,"could not make transfer");

    }

    function withdrawAll() external payable  onlyOwner{
        require(msg.sender != address(0),"can't send to address zero");
        require( msg.value <= 100000000000000000); //user can only withdraw 0.1eth at a time

        (bool success,) = owner.call{value:address(this).balance}("");

        require(success, "cant withdraw all");
        
    }

    modifier onlyOwner {

        require(owner != msg.sender, "you are not the real owner");
        _;
    }

    // function destroyFaucet() external{
    //     selfdestruct(owner);
    // }


}