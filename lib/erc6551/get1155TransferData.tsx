import { Interface } from 'ethers/lib/utils';
import erc1155Abi from '../abi/zora-erc1155-drop.json';

const get1155TransferData = (from: string, to: string, tokenId: string) => {
	const erc1155AbiIface = new Interface(erc1155Abi);
	const data = erc1155AbiIface.encodeFunctionData('safeTransferFrom', [
		from,
		to,
		tokenId,
		1,
		'0x01',
	]);
	return data;
};

export default get1155TransferData;
