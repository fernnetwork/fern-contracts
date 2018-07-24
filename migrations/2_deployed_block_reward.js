const LeafToken = artifacts.require('LeafToken')
const FernBlockReward = artifacts.require('FernBlockReward')
const SYSTEM_ADDRESS = '0xffffFFFfFFffffffffffffffFfFFFfffFFFfFFfE'

module.exports = (deployer, network) => {
  deployer.then(async () => {
    const leafToken = await deployer.deploy(LeafToken)
    await deployer.link(LeafToken, FernBlockReward)
    const fernBlockReward = await deployer.deploy(FernBlockReward, LeafToken.address, SYSTEM_ADDRESS)

    if (network === 'development') {
      // transfer leaf tokens to block reward contract for testing
      await leafToken.transfer(fernBlockReward.address, 10000000)
    }
  })
}
