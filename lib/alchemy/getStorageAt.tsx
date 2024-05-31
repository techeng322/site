import axios from 'axios';
import { CHAIN_ID } from '../consts';
import getAlchemyBaseUrl from './getAlchemyBaseUrl';

const getStorageAt = async (
	smartWalletAddress: string,
	index: any,
	blockTag = 'latest',
	chainId = CHAIN_ID
) => {
	const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_ID;
	const url = `${getAlchemyBaseUrl(chainId)}v2/${alchemyKey}`;

	const requestData = {
		id: 0,
		jsonrpc: '2.0',
		method: 'eth_getStorageAt',
		params: [smartWalletAddress, index, blockTag],
	};
	const { data } = await axios.post(url, requestData);
	return data.result;
};

export default getStorageAt;
