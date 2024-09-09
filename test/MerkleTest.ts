import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, {ethers} from "hardhat";








describe("MerkleAirdrop", function () {

  async function deployContractsAndSetVariables(){

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();
    let amount = ethers.parseUnits('100', 'ether');
    let merkleProof = [
      '0xc7fa9d705743cd99733a59945f5b8a8cace442aa1046af5741478cea5b292db6',
      '0x06520f243871c7edd3c985634bc8170778df8ce64e5c39ded178a1d50ab86309'
    ]; // Replace with actual merkle proof
  
    const MerkleAirdrop = await hre.ethers.getContractFactory("MerkleAirdrop");
    const merkleAirdrop = await MerkleAirdrop.deploy(
      '0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B', // Replace with actual token address
      '0xaba3fd92118cdc46b2ccb00e2a05a4ede717566cca1ef4ee35d6953a88cb7db6' // Replace with actual merkle root
    );
    return { merkleAirdrop,owner,amount,otherAccount,merkleProof}; 
  }

  //deploying the contract, passing the parameters

  describe("Deployment",function(){
    it('should deploy and set the owner correctly',async function(){
       const {owner, merkleAirdrop} = await deployContractsAndSetVariables();

       expect(await merkleAirdrop.owner()).to.equal(owner.address);
      })
      
      it("owner should be able to claim ", async function(){
        const {owner, amount, merkleAirdrop, otherAccount,merkleProof} = await deployContractsAndSetVariables();
        console.log(merkleProof,"merkle proof");
      

      // expect(await merkleAirdrop.connect(otherAccount).claimAirdrop(amount,merkleProof));


      // const initialBalance = ethers.provider.getBalance(owner.address);

      // expect(await merkleAirdrop.connect(owner).hasClaimed(owner.address)).to.be.true;
      // expect(await merkleAirdrop.token.)

    })

    // it("should revert if claim is already made",async function(){
    //   const {owner, amount, merkleAirdrop, otherAccount,merkleProof} = await deployContractsAndSetVariables();
    //   await expect(merkleAirdrop.claimAirdrop(amount, merkleProof, owner.address))
    //   .to.be.revertedWith('Airdrop already claimed.');
    // })
    
  })
  
});
