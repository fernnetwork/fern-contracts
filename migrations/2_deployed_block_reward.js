const LeafToken = artifacts.require('LeafToken')
const FernBlockReward = artifacts.require('FernBlockReward')
const { networks } = require('./config.json')

module.exports = (deployer, network) => {
  const networkConfig = networks[network] || networks.default
  const { SYSTEM_ADDRESS } = networkConfig

  deployer.then(async () => {
    const leafToken = await deployer.deploy(LeafToken)
    await deployer.link(LeafToken, FernBlockReward)
    const fernBlockReward = await deployer.deploy(FernBlockReward, LeafToken.address, SYSTEM_ADDRESS)

    if (network !== 'production') {
      // transfer leaf tokens to block reward contract for testing
      await leafToken.transfer(fernBlockReward.address, 10000000)
    }
  })
}
