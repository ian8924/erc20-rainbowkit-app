import { useContractWrite,useAccount } from 'wagmi'
import { tokenAddress } from '../constants/index'
import tokenContractAbi from '../abis/tokenContractAbi.json'
import { utils } from 'ethers'

const useTokenMint = (minCount : number) => {
    console.log(minCount)
    console.log(utils.parseEther(minCount.toString()).toString())

    const { address } = useAccount()
    const { writeAsync, status } = useContractWrite({
        mode:'recklesslyUnprepared',
        addressOrName: tokenAddress,
        contractInterface: tokenContractAbi,
        functionName : "freeMint",
        args: [address, utils.parseEther(minCount.toString())]
    })

    return {
        freeMint: writeAsync,
        status
    }
}

export default useTokenMint