import { getPublicClient } from './clients';
import { CHAIN_ID } from './consts';
import abi from '@/lib/abi/zora-erc721-drop.json';

const getTokenURI = async (tokenId: any) => {
	const publicClient = getPublicClient(CHAIN_ID);
	const response = (await publicClient.readContract({
		address: process.env.NEXT_PUBLIC_DROP as `0x${string}`,
		abi,
		functionName: 'tokenURI',
		args: [tokenId],
	})) as string;
	return response.toString();
};

export default getTokenURI;
