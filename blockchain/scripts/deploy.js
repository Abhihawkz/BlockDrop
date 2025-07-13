const hre = require("hardhat");

async function main() {
  const FileLedger = await hre.ethers.getContractFactory("FileLedger");
  const fileLedger = await FileLedger.deploy();

  await fileLedger.waitForDeployment();

  console.log("FileLedger deployed to:", await fileLedger.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
