pragma solidity ^0.4.24;

import "./BlockReward.sol";
import "openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";

contract FernBlockReward is BlockReward {
  using SafeERC20 for ERC20Basic;

  address systemAddress;
  ERC20Basic token;

  modifier onlySystem {
    require(msg.sender == systemAddress);
    _;
  }

  constructor(ERC20Basic _token, address _systemAddress)
    public
  {
    // systemAddress = 0xffffFFFfFFffffffffffffffFfFFFfffFFFfFFfE;
    systemAddress = _systemAddress;
    token = _token;
  }

  // produce rewards for the given benefactors, with corresponding reward codes.
  // only callable by `SYSTEM_ADDRESS`
  function reward(address[] benefactors, uint16[] kind)
    external
    onlySystem
    returns (address[], uint256[])
  {
    require(benefactors.length == kind.length);

    for (uint i = 0; i < benefactors.length; i++) {
      // only reward block author
      if(kind[i] == 0) {
        token.safeTransfer(benefactors[0], 1);
      }
    }

    return (benefactors, new uint256[](benefactors.length));
  }
}
