import getRegistryCall from '../tokenbound/getRegistryCall';
import getZoraMintPublicSaleCall from './getZoraMintPublicSaleCall';

const getPublicSaleCalls = (tokenId: string, mintQuantity: number) => {
	const calls = [];
	const zoraMintCall = getZoraMintPublicSaleCall(mintQuantity);
	calls.push(zoraMintCall);
	for (let i = 0; i < mintQuantity; i++) {
		const registryCall = getRegistryCall(tokenId + i);
		calls.push(registryCall);
	}
	return calls;
};

export default getPublicSaleCalls;
