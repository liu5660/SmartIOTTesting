const hre = require("hardhat");

async function main() {
  const EnergyData = await hre.ethers.getContractFactory("EnergyData");
  const energyData = await EnergyData.deploy();

  // ethers v6
  await energyData.waitForDeployment();
  const addr = await energyData.getAddress();

  console.log("✅ EnergyData deployed to:", addr);
}

main().catch((error) => {
  console.error("❌ Deploy failed:", error);
  process.exitCode = 1;
})