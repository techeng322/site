import { CAPSULE_DROP_ADDRESS, CHAIN_ID } from '../consts';
import handleTxError from '../handleTxError';
import { tokenboundPublicClient } from './client';

const getAccount = (tokenId: string) => {
	try {
		const tokenboundAccount = tokenboundPublicClient.getAccount({
			tokenContract: CAPSULE_DROP_ADDRESS as `0x${string}`,
			chainId: CHAIN_ID,
			tokenId,
		});

		return tokenboundAccount;
	} catch (error) {
		handleTxError(error);
		return false;
	}
};

export default getAccount;
