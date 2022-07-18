# Encode Club-Solidity Bootcamp July - Weekend Proejct (Week 1)

- Form groups of 3 to 5 students
- Structure scripts to
  - Deploy
  - Query proposals
  - Give vote right passing an address as input
  - Cast a vote to a ballot passing contract address and proposal as input and using the wallet in environment
  - Delegate my vote passing user address as input and using the wallet in environment
  - Query voting result and print to console
- Publish the project in Github
- Run the scripts with a set of proposals, cast and delegate votes and inspect results
- Write a report detailing the addresses, transaction hashes, description of the operation script being executed and console output from script execution for each step (Deployment, giving voting rights, casting/delegating and querying results).
- (Extra) Use TDD methodology

## Run Tests

yarn install
yarn run test

```

## List all accounts


yarn hardhat run scripts/accounts.ts
```

## Team (Group 10)

Raunak Rana
Bhavishya

## Report

### Contract Deployment

yarn run ts-node scripts/deploy.ts prop1 prop2 prop3

```

### Give Voting Rights

- We give voting rights to two wallets in our demo so that delegation is easier to show as well.


yarn run ts-node scripts/giveVotingRights.ts  0x93f6C12C3Bc6e70d6a58f159B69c175f04608379 # contract address and voter address

```

yarn run ts-node scripts/giveVotingRights.ts # contract address and voter address

```

### Delegating Vote

- First wallet from above delegates to second wallet


yarn run ts-node scripts/delegateVote.ts
```

### Casting Vote

yarn run ts-node scripts/castVote.ts 2 # contract address and proposal index to vote for

```

### Querying Proposals


yarn run ts-node scripts/queryProposals.ts  0 # contract address and proposal index to query
```

yarn run ts-node scripts/queryProposals.ts 2 # contract address and proposal index to query

```

### Query Voting Result


yarn ts-node scripts/queryVotingResults.ts
```
