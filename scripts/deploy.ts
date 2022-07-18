import { ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../artifacts/contracts/Ballot.sol/Ballot.json";

const EXPOSED_KEY = "";

// const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function main() {
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);

  console.log(`Using address ${wallet.address}`);
  const provider = new ethers.providers.InfuraProvider(
    "ropsten",
    process.env.INFURA_PROJ_ID
  );
  const signer = wallet.connect(provider);
  const balance = await signer.getBalance();
  const decimal = parseFloat(ethers.utils.formatEther(balance));
  console.log(`Wallet balance ${decimal}`);

  console.log("Deploying Ballot contract");
  console.log("Proposals: ");

  const proposals = process.argv.slice(2);
  if (proposals.length < 2) throw new Error("Not enough proposals provided");

  proposals.forEach((element, index) => {
    console.log(`Proposal # ${index + 1}: ${element}`);
  });
  const contractFactory = new ethers.ContractFactory(
    ballotJson.abi,
    ballotJson.bytecode,
    signer
  );
  const contract = await contractFactory.deploy(
    convertStringArrayToBytes32(proposals)
  );
  await contract.deployed();
  console.log(`Contract deployed at ${contract.address}`);
  const balance1 = await signer.getBalance();
  const decimal1 = parseFloat(ethers.utils.formatEther(balance1));
  console.log(`Wallet balance ${decimal1}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
