import { Interface } from 'ethers/lib/utils';
import abi from '../abi/ERC6551-account.json';

const getExecuteData = (
	toContractAddress: string,
	value: string,
	data: string
) => {
	const smartWalletIface = new Interface(abi);

	return smartWalletIface.encodeFunctionData('execute', [
		toContractAddress,
		value,
		data,
		0,
	]);
};

export default getExecuteData;
