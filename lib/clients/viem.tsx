import { createPublicClient, http } from 'viem';
import getViemNetwork from '../utils/getViemNetwork';
import getAlchemyRpcUrl from '../alchemy/getAlchemyRpcUrl';

export const getPublicClient = (chainId: number) => {
	const RPC_URL = getAlchemyRpcUrl(chainId);
	const chain = getViemNetwork(chainId);
	const publicClient = createPublicClient({
		chain: chain,
		transport: http(RPC_URL),
	});
	return publicClient;
};
