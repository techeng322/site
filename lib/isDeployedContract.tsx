import { CHAIN_ID } from './consts';
import getDefaultProvider from './getDefaultProvider';

const isDeployedContract = async (address: string, chainId = CHAIN_ID) => {
	const provider = getDefaultProvider(chainId);
	const code = await provider.getCode(address);
	const hasTokenboundAccount = code !== '0x';
	return hasTokenboundAccount;
};

export default isDeployedContract;
