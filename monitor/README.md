# block-reward-monitor
Test program for monitoring miner token increase.

### Getting Started
1. Run Parity PoA network using [fern-parity-deploy](https://github.com/fernnetwork/fern-parity-deploy)
2. Deploy Fern contracts
3. Add block reward contract address to chain spec:
```
...
"engine": {
  "authorityRound": {
    "params": {
      "gasLimitBoundDivisor": "0x400",
        "stepDuration": "2",
          "validators": {
        "list": [
          "0x9b7b86fc70ba2ad53e98d5f8f852c3629f813c7a",
          "0x6d480772b57e91f1c4e1cc196df88896d27ed327",
          "0x5d8b81d0fe11046bb0dc31507706a08c0e1d5e85"
        ]
      },
      "blockRewardContractAddress": "0x55B9186E1aB4DaBf46dbB2de76FC129611CA0cc5"
    }
  }
},
...
```
4. Restart parity nodes: `docker-compose restart`
5. Run the monitor program
```
npm i && npm start
```
