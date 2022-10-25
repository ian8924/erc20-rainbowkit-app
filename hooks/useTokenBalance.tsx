import { useContractRead, useAccount } from "wagmi";
import { tokenAddress } from "../constants/index";
import tokenContractAbi from "../abis/tokenContractAbi.json";
import { useEffect, useState } from "react";
import { utils } from "ethers";


const useTokenBalance = () => {
  const { address } = useAccount();
  const [balance, setBalance] = useState("");
  const { data: _balance } = useContractRead({
    addressOrName: tokenAddress,
    contractInterface: tokenContractAbi,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  useEffect(() => {
    if (_balance) {
      setBalance(utils.formatEther(_balance+""));
    }
  }, [_balance]);

  return {
    balance,
  };
};

export default useTokenBalance;
