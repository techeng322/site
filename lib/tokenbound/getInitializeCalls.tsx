import getAccount from './getAccount';
import getInitializeCall from './getInitializeCall';

const getInitializeCalls = (startTokenId: any, quantity: any) => {
	const calls = [];
	for (let i = 0; i < quantity; i++) {
		const tba = getAccount(startTokenId);
		if (!tba) return [];
		const tbaInitializationCall = getInitializeCall(tba);
		calls.push(tbaInitializationCall);
	}
	return calls;
};

export default getInitializeCalls;
