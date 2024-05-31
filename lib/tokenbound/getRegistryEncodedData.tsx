import { Interface } from 'ethers/lib/utils';
import { ACCOUNT_PROXY, CHAIN_ID, SALT_BYTES } from '@/lib/consts';
import registryAbi from '@/lib/abi/ERC6551-registry.json';

const getRegistryEncodedData = (dropAddress: string, tokenId: string) =>
	new Interface(registryAbi).encodeFunctionData('createAccount', [
		ACCOUNT_PROXY,
		SALT_BYTES,
		CHAIN_ID,
		dropAddress,
		tokenId,
	]);

export default getRegistryEncodedData;
