import { useContractWrite,useAccount } from 'wagmi'
import { tokenAddress,chatroomAddress } from '../constants/index'
import tokenContractAbi from '../abis/tokenContractAbi.json'
import { utils } from 'ethers'

const useTokenApprove = (minCount : number) => {
    // console.log(minCount)
    // console.log(utils.parseEther(minCount.toString()).toString())

    const { address } = useAccount()
    const { writeAsync, status } = useContractWrite({
        mode:'recklesslyUnprepared',
        addressOrName: tokenAddress,
        contractInterface: tokenContractAbi,
        functionName : "approve",
        args: [chatroomAddress, utils.parseEther(minCount.toString())]
    })

    return {
        approve: writeAsync,
        status
    }
}

export default useTokenApprove