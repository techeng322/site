import { TokenboundClient } from '@tokenbound/sdk';
import { WalletClient } from 'viem';
import { getPublicClient } from '../clients';
import { CHAIN, CHAIN_ID } from '../consts';

const publicClient = getPublicClient(CHAIN_ID);
export const tokenboundPublicClient = new TokenboundClient({
	publicClient: publicClient as any,
	chain: CHAIN,
});

export const tokenboundWalletClient = new TokenboundClient({
	publicClient: publicClient as any,
	chain: CHAIN,
});

export const getTokenboundWalletClient = (walletClient: WalletClient) => {
	try {
		return new TokenboundClient({
			walletClient,
			chain: CHAIN,
		});
	} catch (err) {
		console.error(err);
		return null;
	}
};
