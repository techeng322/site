import { Interface } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';
import erc721Abi from '../abi/zora-erc721-drop.json';
import abi from '../abi/optimism-portal.json';
import getExecuteData from './getExecuteData';

const getTransferFromTransactionData = (
	smartWalletAddress: string,
	tokenContractAddress: string,
	to: string,
	tokenId: string
) => {
	const optimismPortalAbiIface = new Interface(abi);
	const erc721AbiIface = new Interface(erc721Abi);
	const from = smartWalletAddress;
	// TODO: IS THIS GAS LIMIT CORRECT FOR GIVEN FUNCTION
	// TRANSFER_FROM
	const data = erc721AbiIface.encodeFunctionData('transferFrom', [
		from,
		to,
		tokenId,
	]);
	const optimismPortalData = getExecuteData(tokenContractAddress, '0', data);
	const value = 0;
	const gasLimit = BigNumber.from('1201676');
	const isCreation = false;
	return optimismPortalAbiIface.encodeFunctionData('depositTransaction', [
		smartWalletAddress,
		value,
		gasLimit,
		isCreation,
		optimismPortalData,
	]);
};

export default getTransferFromTransactionData;
