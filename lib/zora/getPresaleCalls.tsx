import getRegistryCall from '../tokenbound/getRegistryCall';
import getZoraMintPresaleCall from './getZoraMintPresaleCall';

const getPresaleCalls = (tokenId: string, mintQuantity: number) => {
	const calls = [];
	const zoraMintCall = getZoraMintPresaleCall(mintQuantity);
	calls.push(zoraMintCall);
	for (let i = 0; i < mintQuantity; i++) {
		const registryCall = getRegistryCall(tokenId + i);
		calls.push(registryCall);
	}
	return calls;
};

export default getPresaleCalls;
