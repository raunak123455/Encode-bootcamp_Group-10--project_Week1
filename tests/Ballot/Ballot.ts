import { expect } from "chai";
import { ethers } from "hardhat";

import { Ballot } from "../../typechain-types";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

describe("Ballot", function () {
  let contract: Ballot;
  let accounts: any[];

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    const ballotFactory = await ethers.getContractFactory("Ballot");
    contract = await ballotFactory.deploy(
      PROPOSALS.map(s => ethers.utils.formatBytes32String(s))
    );
    await contract.deployed();
  });

  describe("when the contract is deployed", function () {
    it("sets the deployer address as chairperson", async function () {
      const chairperson = await contract.chairperson();

      expect(chairperson).to.eq(accounts[0].address);
    });
  });
});
