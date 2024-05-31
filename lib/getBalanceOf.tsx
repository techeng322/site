import { getPublicClient } from './clients';
import erc1155Abi from '@/lib/abi/ERC1155.json';

const getBalanceOf = async (
	contractAddress: string,
	address: string,
	tokenId: string,
	chainId: number
) => {
	const publicClient = getPublicClient(chainId);
	const response = (await publicClient.readContract({
		address: contractAddress as `0x${string}`,
		abi: erc1155Abi,
		functionName: 'balanceOf',
		args: [address, tokenId],
	})) as BigInt;

	return parseInt(response.toString(), 10);
};

export default getBalanceOf;
