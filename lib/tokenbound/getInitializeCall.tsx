import { Interface } from 'ethers/lib/utils';
import { ACCOUNT_IMPLEMENTATION } from '../consts';
import accountAbi from '@/lib/abi/ERC6551-account.json';

const getInitializeCall = (tbaAddress: string) => {
	const intializeEncodedData = new Interface(accountAbi).encodeFunctionData(
		'initialize',
		[ACCOUNT_IMPLEMENTATION]
	);

	return {
		target: tbaAddress,
		value: 0,
		allowFailure: false,
		callData: intializeEncodedData,
	};
};

export default getInitializeCall;
