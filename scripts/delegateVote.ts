import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../artifacts/contracts/Ballot.sol/Ballot.json";

import { Ballot } from "../typechain-types";
import { expect } from "chai";

const EXPOSED_KEY = "";

async function main() {
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(process.env.VOTER_PRIV_KEY ?? EXPOSED_KEY);

  console.log(`Using address ${wallet.address}`);
  const provider = new ethers.providers.InfuraProvider(
    "ropsten",
    process.env.INFURA_PROJ_ID
  );
  const signer = wallet.connect(provider);
  const balance = await signer.getBalance();
  const decimal = parseFloat(ethers.utils.formatEther(balance));
  console.log(`Wallet balance ${decimal}`);

  if (decimal < 0.01) {
    throw new Error("Not enough ether");
  }

  if (process.argv.length < 3) throw new Error("Ballot address missing");
  const ballotAddress = process.argv[2];
  if (process.argv.length < 4)
    throw new Error("Address to delegate vote to is missing");
  const to = process.argv[3];

  console.log(
    `Attaching ballot contract interface to address ${ballotAddress}`
  );

  const ballotContract: Ballot = new Contract(
    ballotAddress,
    ballotJson.abi,
    signer
  ) as Ballot;

  const voter = await ballotContract.voters(signer.address);

  if (voter.weight.toNumber() < 1) {
    throw new Error("Voter can't vote");
  }
  if (voter.voted === true) {
    throw new Error("Voter address already voted");
  }
  if (to === signer.address) {
    throw new Error("Voter can't self-delegate");
  }

  const delegatedToWeight = (await ballotContract.voters(to)).weight.toNumber();
  if (delegatedToWeight < 1) {
    throw new Error("Can't delegate to addresses that can't vote");
  }

  console.log(`${wallet.address} is delegating their vote to ${to}`);
  const tx = await ballotContract.connect(signer).delegate(to);
  console.log("Awaiting confirmations");
  await tx.wait();
  console.log(`Transaction completed. Hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
