'use strict'
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const expect = chai.expect
chai.use(chaiAsPromised)

const FernBlockReward = artifacts.require('./FernBlockReward.sol')
const LeafToken = artifacts.require('./LeafToken.sol')

contract('FernBlockReward', accounts => {
  const SYSTEM = accounts[9]
  let leafToken
  let blockReward

  beforeEach(async () => {
    leafToken = await LeafToken.new()
    blockReward = await FernBlockReward.new(leafToken.address, SYSTEM)
    leafToken.transfer(blockReward.address, 1000000)
  })

  it('should transfer rewards to benefactor', async () => {
    const benefactors = [
      accounts[1]
    ]
    const kind = [ 0 ]

    let balance = await leafToken.balanceOf(accounts[1])
    expect(balance).to.equal('0')

    await blockReward.reward(benefactors, kind, { from: SYSTEM })
    balance = await leafToken.balanceOf(accounts[1])
    expect(balance).to.equal('1')
  })

  it('should reject calls not coming from system', () => {
    const benefactors = [
      accounts[1],
      accounts[2],
      accounts[3],
      accounts[4]
    ]

    const kind = [ 0, 1, 2, 3 ]

    const result = blockReward.reward(benefactors, kind, { from: accounts[1] })
    expect(result).be.rejectedWith('revert')
  })
})
