import { CAPSULE_DROP_ADDRESS } from '../consts';
import getTotalSupply from '../getTotalSupply';
import handleTxError from '../handleTxError';

const getZoraNextTokenId = async () => {
	try {
		const lastMinted = (await getTotalSupply(
			CAPSULE_DROP_ADDRESS as string
		)) as any;
		const nextTokenId = (lastMinted + BigInt(1)).toString();
		return nextTokenId;
	} catch (error) {
		handleTxError(error);
		return false;
	}
};

export default getZoraNextTokenId;
