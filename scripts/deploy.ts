import { ethers } from "hardhat";

async function main() {
  const bichocoin = await ethers.deployContract("BichoCoin");

  await bichocoin.waitForDeployment();

  const address = await bichocoin.getAddress();

  console.log(`BichoCoin deployed to ${address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
