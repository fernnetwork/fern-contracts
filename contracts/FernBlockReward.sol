pragma solidity ^0.4.24;

import "./BlockReward.sol";
import "openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";

/** @title FernBlockReward
  * @dev Rewards block miner with ERC-20 tokens for every block mined. 
  * Default token used is Leaf. This can be changed to any ERC-20 compliant 
  * token contract during deployment of this contract.
  * 
  * This contract implements the Parity BlockReward interface:
  * https://wiki.parity.io/Block-Reward-Contract
  */
contract FernBlockReward is BlockReward {
  using SafeERC20 for ERC20Basic;

  address systemAddress;
  ERC20Basic token;

  modifier onlySystem {
    require(msg.sender == systemAddress);
    _;
  }

  /** @param _token Address of ERC-20 token to be used as block reward.
    * @param _systemAddress Parity system address, should always be 0xffffFFFfFFffffffffffffffFfFFFfffFFFfFFfE in production.
    */
  constructor(ERC20Basic _token, address _systemAddress)
    public
  {
    systemAddress = _systemAddress;
    token = _token;
  }

  /** @dev produce ERC-20 token rewards for block authors. Only callable by `SYSTEM_ADDRESS`.
    * @param benefactors addresses to reward.
    * @param kind reward types of either 0. Author 1. Uncle 2. Empty step. Only block authors are rewarded.
    */
  function reward(address[] benefactors, uint16[] kind)
    external
    onlySystem
    returns (address[], uint256[])
  {
    require(benefactors.length == kind.length);

    for (uint i = 0; i < benefactors.length; i++) {
      // only reward block author
      if(kind[i] == 0) {
        token.safeTransfer(benefactors[i], 1);
      }
    }

    return (benefactors, new uint256[](benefactors.length));
  }
}
