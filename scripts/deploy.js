const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying Secure Music Flow contracts...");

  // Get the contract factories
  const FHEEncryption = await ethers.getContractFactory("FHEEncryption");
  const SecureMusicFlow = await ethers.getContractFactory("SecureMusicFlow");

  // Deploy FHEEncryption contract
  console.log("Deploying FHEEncryption contract...");
  const fheEncryption = await FHEEncryption.deploy();
  await fheEncryption.deployed();
  console.log("FHEEncryption deployed to:", fheEncryption.address);

  // Deploy SecureMusicFlow contract
  console.log("Deploying SecureMusicFlow contract...");
  const secureMusicFlow = await SecureMusicFlow.deploy();
  await secureMusicFlow.deployed();
  console.log("SecureMusicFlow deployed to:", secureMusicFlow.address);

  // Set initial FHE public key
  console.log("Setting initial FHE public key...");
  const initialPublicKey = "fhe_public_key_placeholder_" + Date.now();
  await secureMusicFlow.updateFHEPublicKey(initialPublicKey);
  console.log("FHE public key set");

  // Verify contracts
  console.log("Verifying contracts...");
  try {
    await hre.run("verify:verify", {
      address: fheEncryption.address,
      constructorArguments: [],
    });
    console.log("FHEEncryption verified");
  } catch (error) {
    console.log("FHEEncryption verification failed:", error.message);
  }

  try {
    await hre.run("verify:verify", {
      address: secureMusicFlow.address,
      constructorArguments: [],
    });
    console.log("SecureMusicFlow verified");
  } catch (error) {
    console.log("SecureMusicFlow verification failed:", error.message);
  }

  console.log("\n=== Deployment Summary ===");
  console.log("Network:", hre.network.name);
  console.log("FHEEncryption:", fheEncryption.address);
  console.log("SecureMusicFlow:", secureMusicFlow.address);
  console.log("FHE Public Key:", initialPublicKey);

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    timestamp: new Date().toISOString(),
    contracts: {
      FHEEncryption: fheEncryption.address,
      SecureMusicFlow: secureMusicFlow.address,
    },
    fhePublicKey: initialPublicKey,
  };

  const fs = require("fs");
  const path = require("path");
  const deploymentPath = path.join(__dirname, "..", "deployments", `${hre.network.name}.json`);
  
  // Ensure deployments directory exists
  const deploymentsDir = path.dirname(deploymentPath);
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
  console.log(`Deployment info saved to: ${deploymentPath}`);

  console.log("\n=== Next Steps ===");
  console.log("1. Update your .env file with the contract addresses");
  console.log("2. Update your frontend configuration");
  console.log("3. Test the contracts on the testnet");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
