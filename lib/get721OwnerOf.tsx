import { getPublicClient } from './clients';
import erc721Abi from '@/lib/abi/ERC721.json';

const get721OwnerOf = async (
	contractAddress: string,
	tokenId: string,
	chainId: number
) => {
	if (!tokenId) return '';
	const publicClient = getPublicClient(chainId);
	const response = (await publicClient.readContract({
		address: contractAddress as `0x${string}`,
		abi: erc721Abi,
		functionName: 'ownerOf',
		args: [tokenId],
	})) as any;

	return response.toString();
};

export default get721OwnerOf;
