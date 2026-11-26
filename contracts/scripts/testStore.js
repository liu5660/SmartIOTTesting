const hre = require("hardhat");

async function main() {
  const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const energyData = await hre.ethers.getContractAt("EnergyData", CONTRACT_ADDRESS);

  const deviceId = "sensor-001";
  const humidity = "60";
  const weight = "1.5";
  const gas = "300";
  const hash = "5ef10b04607b84cbc14a9d379a5b18208d2122c9d3e4991fec7a8ef7278753b0";

  const tx = await energyData.storeData(deviceId, humidity, weight, gas, hash);
  console.log("⛓️ tx sent:", tx.hash);

  await tx.wait();
  console.log("✅ tx mined");

  const count = await energyData.getCount();
  console.log("📦 count:", count.toString());

  const rec = await energyData.getRecord(0);
  console.log("📄 record[0]:", rec);
}

main().catch((e) => {
  console.error("❌ test failed:", e);
  process.exitCode = 1;
});