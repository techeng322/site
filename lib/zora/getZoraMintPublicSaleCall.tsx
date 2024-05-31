import { encodeFunctionData } from 'viem';
import { BigNumber } from 'ethers';
import zoraAbi from '@/lib/abi/zora-erc721-drop.json';
import { CAPSULE_DROP_ADDRESS, COMMENT, PRICE, ZORA_FEE } from '@/lib/consts';

const getZoraMintPublicSaleCall = (mintQuantity: number) => {
	const totalPrice = BigNumber.from(PRICE)
		.add(ZORA_FEE)
		.mul(mintQuantity)
		.toString();
	const callData = encodeFunctionData({
		abi: zoraAbi,
		functionName: 'purchaseWithComment',
		args: [mintQuantity, COMMENT],
	});

	return {
		target: CAPSULE_DROP_ADDRESS,
		value: totalPrice,
		allowFailure: false,
		callData,
	};
};

export default getZoraMintPublicSaleCall;
