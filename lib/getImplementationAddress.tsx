import { BigNumber, utils } from 'ethers';
import getStorageAt from './alchemy/getStorageAt';
import { CHAIN_ID } from './consts';

const ERC1967_IMPLEMENTATION_SLOT =
	'0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';
const NULL_DATA =
	'0x0000000000000000000000000000000000000000000000000000000000000000';

const getImplementationAddress = async (
	proxyAddress: string,
	chainId = CHAIN_ID
) => {
	const data = await getStorageAt(
		proxyAddress,
		ERC1967_IMPLEMENTATION_SLOT,
		'latest',
		chainId
	);
	const missingImplementation = data === NULL_DATA;
	return missingImplementation
		? false
		: utils.getAddress(BigNumber.from(data).toHexString());
};

export default getImplementationAddress;
