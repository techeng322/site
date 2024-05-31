import axios from 'axios';
import { CHAIN_ID } from '../consts';
import getAlchemyBaseUrl from './getAlchemyBaseUrl';

const getNFTs = async (
	address: string,
	contractAddress: string = '',
	chainId: number = CHAIN_ID
) => {
	const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_ID;
	let nfts = [] as any;
	let pageKey = null;
	let totalCount = 0;

	const optionalContractParam = contractAddress
		? `&contractAddresses%5B%5D=${contractAddress}`
		: '';

	while (1) {
		try {
			const requestUrl = `${getAlchemyBaseUrl(
				chainId
			)}nft/v3/${alchemyKey}/getNFTsForOwner?owner=${address}${optionalContractParam}&withMetadata=true${
				pageKey ? `&pageKey=${pageKey}` : ''
			}`;
			const { data } = (await axios.get(requestUrl)) as any;
			if (data.ownedNfts.length) nfts = nfts.concat(data.ownedNfts);
			if (data.totalCount) totalCount = data.totalCount;

			if (!data.pageKey) break;
			pageKey = data.pageKey;
		} catch (err) {
			break;
		}
	}

	return {
		ownedNfts: nfts,
		totalCount,
	};
};

export default getNFTs;
