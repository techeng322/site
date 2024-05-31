import { encodeFunctionData } from 'viem';
import { BigNumber } from 'ethers';
import zoraAbi from '@/lib/abi/zora-erc721-drop.json';
import {
	CAPSULE_DROP_ADDRESS,
	IS_TESTNET,
	PRESALE_PRICE,
	ZORA_FEE,
} from '@/lib/consts';

const getZoraMintPresaleCall = (mintQuantity: number) => {
	const totalPrice = BigNumber.from(PRESALE_PRICE)
		.add(ZORA_FEE)
		.mul(mintQuantity)
		.toString();
	const mekleMaxQuantity = IS_TESTNET ? 300 : 25;
	const merklePricePerToken = 0;
	const proof = [
		IS_TESTNET
			? '0x682a2c8f714235bca22860f606d86db94df927cdf058933d3985e78719856209'
			: '0x682a2c8f714235bca22860f606d86db94df927cdf058933d3985e78719856209',
	];
	const callData = encodeFunctionData({
		abi: zoraAbi,
		functionName: 'purchasePresale',
		args: [mintQuantity, mekleMaxQuantity, merklePricePerToken, proof],
	});

	return {
		target: CAPSULE_DROP_ADDRESS,
		value: totalPrice,
		allowFailure: false,
		callData,
	};
};

export default getZoraMintPresaleCall;
