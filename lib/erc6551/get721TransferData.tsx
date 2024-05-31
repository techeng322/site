import { Interface } from 'ethers/lib/utils';
import erc721Abi from '../abi/zora-erc721-drop.json';

const get721TransferData = (from: string, to: string, tokenId: string) => {
	const erc721AbiIface = new Interface(erc721Abi);
	const data = erc721AbiIface.encodeFunctionData('transferFrom', [
		from,
		to,
		tokenId,
	]);
	return data;
};

export default get721TransferData;
