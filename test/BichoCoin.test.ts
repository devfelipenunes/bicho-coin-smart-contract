import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ProtoCoin Tests", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const BichoCoin = await ethers.getContractFactory("BichoCoin");
    const bichocoin = await BichoCoin.deploy();
    return { bichocoin, owner, otherAccount };
  }

  it("Should have correct name", async function () {
    const { bichocoin } = await loadFixture(deployFixture);
    const name = await bichocoin.name();
    expect(name).to.equal("BichoCoin");
  });

  it("Should have correct symbol", async function () {
    const { bichocoin } = await loadFixture(deployFixture);
    const symbol = await bichocoin.symbol();
    expect(symbol).to.equal("BC");
  });

  it("Should have correct totalSupply", async function () {
    const { bichocoin } = await loadFixture(deployFixture);
    const totalSupply = await bichocoin.totalSupply();
    expect(totalSupply).to.equal(1000);
  });

  it("Should get balance", async function () {
    const { bichocoin, owner } = await loadFixture(deployFixture);
    const balance = await bichocoin.balanceOf(owner.address);
    expect(balance).to.equal(1000);
  });

  it("Should transfer", async function () {
    const { bichocoin, owner, otherAccount } = await loadFixture(deployFixture);
    await bichocoin.transfer(otherAccount.address, 100);
    const balance = await bichocoin.balanceOf(otherAccount.address);
    expect(balance).to.equal(100);
  });

  it("Should fail transfer", async function () {
    const { bichocoin, owner, otherAccount } = await loadFixture(deployFixture);
    await expect(
      bichocoin.connect(otherAccount).transfer(owner.address, 100)
    ).to.be.revertedWith("Not enough balance");
  });

  it("Should mint once", async function () {
    const { bichocoin, owner, otherAccount } = await loadFixture(deployFixture);

    const mintAmount = 10n;
    await bichocoin.setMintAmount(mintAmount);

    await bichocoin.transfer(otherAccount.address, 10n);

    const balanceBefore = await bichocoin.balanceOf(otherAccount.address);

    const instance = bichocoin.connect(otherAccount);
    await instance.mint();

    const balanceAfter = await bichocoin.balanceOf(otherAccount.address);

    expect(balanceAfter).to.equal(balanceBefore + mintAmount);
  });
});
