const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying OrbitCity contracts...");

  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  
  const balance = await deployer.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance), "ETH");

  // Deploy OrbitCityHub contract
  const OrbitCityHub = await ethers.getContractFactory("OrbitCityHub");
  const treasury = deployer.address; // Use deployer as treasury for now
  
  console.log("Deploying OrbitCityHub...");
  const hub = await OrbitCityHub.deploy(treasury);
  await hub.deployed();

  console.log("✅ OrbitCityHub deployed to:", hub.address);
  console.log("Treasury address:", treasury);
  
  // Deploy PaymentProcessor contract
  const PaymentProcessor = await ethers.getContractFactory("PaymentProcessor");
  console.log("Deploying PaymentProcessor...");
  const payment = await PaymentProcessor.deploy();
  await payment.deployed();

  console.log("✅ PaymentProcessor deployed to:", payment.address);

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    chainId: (await ethers.provider.getNetwork()).chainId,
    contracts: {
      OrbitCityHub: hub.address,
      PaymentProcessor: payment.address
    },
    deployer: deployer.address,
    deployedAt: new Date().toISOString()
  };

  console.log("\n📄 Deployment Summary:");
  console.log(JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });