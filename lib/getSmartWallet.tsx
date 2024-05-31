import { Contract } from 'ethers';
import registryAbi from './abi/ERC6551-registry.json';
import getDefaultProvider from './getDefaultProvider';
import {
	ACCOUNT_PROXY,
	CHAIN_ID,
	REGISTRY_ADDRESS,
	SALT_BYTES,
} from './consts';

const getSmartWallet = async (capsuleId: number) => {
	const registryContract = new Contract(
		REGISTRY_ADDRESS,
		registryAbi,
		getDefaultProvider(CHAIN_ID)
	);
	const tokenBoundAccount = await registryContract.account(
		ACCOUNT_PROXY,
		SALT_BYTES,
		CHAIN_ID,
		process.env.NEXT_PUBLIC_DROP,
		capsuleId
	);

	return tokenBoundAccount;
};

export default getSmartWallet;
