# fern-contracts
Smart contracts for the [Fern protocol](https://fern.network).

## List of Contracts
### FernToken
ERC-20 token used for staking in order to participate in the network.

### LeafToken
ERC-20 token for rewarding service provider contributions in the network. Network owner needs to purchase 
these tokens from an exchange and deposit them into the `FernBlockReward`.

### FernBlockReward
Rewards block miner with ERC-20 tokens for every block mined. Default token used is Leaf. This can be changed to any ERC-20 compliant token contract during deployment of this contract.
