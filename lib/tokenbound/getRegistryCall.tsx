import { Address } from 'viem';
import { CAPSULE_DROP_ADDRESS, REGISTRY_ADDRESS } from '../consts';
import getRegistryEncodedData from './getRegistryEncodedData';

const getRegistryCall = (capsuleId: string) => {
	const createAccountData = getRegistryEncodedData(
		CAPSULE_DROP_ADDRESS as Address,
		capsuleId
	);

	return {
		target: REGISTRY_ADDRESS,
		value: 0,
		allowFailure: false,
		callData: createAccountData,
	};
};

export default getRegistryCall;
