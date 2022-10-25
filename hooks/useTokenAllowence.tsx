import { useContractRead, useAccount } from "wagmi";
import { tokenAddress , chatroomAddress} from "../constants/index";
import tokenContractAbi from "../abis/tokenContractAbi.json";
import { useEffect, useState } from "react";
import { utils } from "ethers";


const useTokenBalance = () => {
  const { address } = useAccount();
  const [allowance, setAllowance] = useState("");
  const { data: _allowance } = useContractRead({
    addressOrName: tokenAddress,
    contractInterface: tokenContractAbi,
    functionName: "allowance",
    args: [address,chatroomAddress],
    watch: true,
  });

  useEffect(() => {
    if (_allowance) {
      setAllowance(utils.formatEther(_allowance+""));
    }
  }, [_allowance]);

  return {
    allowance,
  };
};

export default useTokenBalance;
