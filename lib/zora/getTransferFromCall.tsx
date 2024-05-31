import { encodeFunctionData } from 'viem';
import zoraAbi from '@/lib/abi/zora-erc721-drop.json';
import { CAPSULE_DROP_ADDRESS, MULTICALL3_ADDRESS } from '@/lib/consts';

const getTransferFromCall = (to: `0x${string}`, tokenId: bigint) => {
	const callData = encodeFunctionData({
		abi: zoraAbi,
		functionName: 'transferFrom',
		args: [MULTICALL3_ADDRESS, to, tokenId],
	});

	return {
		target: CAPSULE_DROP_ADDRESS,
		value: 0,
		allowFailure: false,
		callData,
	};
};

export default getTransferFromCall;
