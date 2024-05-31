import { getPublicClient } from './clients';
import handleTxError from './handleTxError';
import { CHAIN } from './consts';
import erc721Abi from '@/lib/abi/ERC721.json';

const getTotalSupply = async (dropAddress: string) => {
	try {
		const publicClient = getPublicClient(CHAIN.id);
		const response = await publicClient.readContract({
			address: dropAddress as `0x${string}`,
			abi: erc721Abi,
			functionName: 'totalSupply',
		});
		return response;
	} catch (error) {
		handleTxError(error);
		return false;
	}
};

export default getTotalSupply;
