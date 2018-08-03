'use strict'
/** Block reward test program for monitoring miner token increase. **/

const { abi: leafTokenAbi, networks } = require('../build/contracts/LeafToken.json')
const { validators, networkId } = require('./config.js')

const Web3 = require('web3')
const web3 = new Web3('ws://localhost:8546')

const leafTokenAddress = networks[networkId].address
const leafTokenContract = new web3.eth.Contract(leafTokenAbi, leafTokenAddress)

// log result on every new block
web3.eth.subscribe('newBlockHeaders', async (error, blockHeader) => {
  console.log(`New blocked mined by ${blockHeader.miner}.`)

  const results = await Promise.all(validators.map(validator => {
    return leafTokenContract.methods.balanceOf(validator).call()
  }))

  results.forEach((balance, index) => {
    console.log(`Validator ${validators[index]} LEAF token balance: ${balance}`)
  })
})

// create transactions
const send = (previous) => setTimeout(async () => {
  await previous
  const next = web3.eth.sendTransaction({
    from: '0x00Ea169ce7e0992960D3BdE6F5D539C955316432',
    to: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    value: '1',
    gas: 500000
  })
  send(next)
}, 5000)

send(Promise.resolve())
