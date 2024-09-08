import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, {ethers} from "hardhat";

describe('Faucet', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const Faucet = await ethers.getContractFactory('Faucet');
    const faucet = await Faucet.deploy();

    const [owner, otherAccount] = await ethers.getSigners();

    const withdrawAmount = ethers.parseUnits("1", "ether")

    // console.log('Signer 1 address: ', owner.address);
    // console.log('fauet owner', await faucet.owner());
    return { faucet, owner, withdrawAmount , otherAccount};
  }

  it('should deploy and set the owner correctly', async function () {
    const {faucet, owner } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address)
  });

  it('should not be able to withdraw more than 0.1ETH', async function(){
    const {faucet, owner , withdrawAmount} = await loadFixture(deployContractAndSetVariables);

    expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
    
  })

  it('should not allow any address except the owner withdraw totally', async function(){
    const {faucet, otherAccount , withdrawAmount} = await loadFixture(deployContractAndSetVariables);

    expect(faucet.connect(otherAccount).withdrawAll()).to.be.revertedWith("only owner can withdraw")
  })
  
  it('should allow only the owner to be able to withdraw totally', async function(){
    const {faucet} = await loadFixture(deployContractAndSetVariables);
    expect(faucet.withdrawAll()).to.be.reverted
    
  })


});