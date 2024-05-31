import handleTxError from '../lib/handleTxError';
import erc1155Abi from '../lib/abi/ERC1155.json';
import { useState } from 'react';
import { CHAIN_ID } from '@/lib/consts';
import usePrepareForTx from './usePrepareForTransaction';
import { Address, encodeFunctionData } from 'viem';
import useTokenboundWalletClient from './useTokenboundWalletClient';
import { getPublicClient } from '@/lib/clients';
import usePrivyEthersSigner from './usePrivyEthersSigner';
import { Contract } from 'ethers';

const useERC1155Transfer = () => {
	const { prepare } = usePrepareForTx();
	const [txLoading, setTxLoading] = useState(false);
	const { signer } = usePrivyEthersSigner();
	const { tokenboundClient } = useTokenboundWalletClient();

	const transferERC1155 = async (
		erc1155Address: string,
		from: string,
		to: string,
		tokenId: number
	) => {
		try {
			const prepared = await prepare();
			if (!prepared) return { err: 'missing signer' };
			const contract = new Contract(erc1155Address, erc1155Abi, signer);
			const tx = await contract.safeTransferFrom(from, to, tokenId, 1, '0x01');
			const receipt = await tx.wait();
			setTxLoading(false);
			return receipt;
		} catch (err) {
			handleTxError(err);
			return { err };
		}
	};

	const transferERC1155FromERC6551Account = async (
		tokenBoundAccount: string,
		erc1155Address: string,
		to: string,
		tokenId: number,
		chainId: number = CHAIN_ID
	) => {
		try {
			const prepared = await prepare();
			if (!prepared) return { err: 'missing signer' };
			setTxLoading(true);
			const data = encodeFunctionData({
				functionName: 'safeTransferFrom',
				abi: erc1155Abi,
				args: [tokenBoundAccount, to, tokenId, 1, '0x01'],
			});
			if (!tokenboundClient) return { err: 'tokenboundClient is null' };
			const hash = await tokenboundClient.execute({
				account: tokenBoundAccount as Address,
				to: erc1155Address as Address,
				value: BigInt(0),
				data,
				chainId,
			});

			const transaction = await getPublicClient(
				CHAIN_ID
			).waitForTransactionReceipt({
				hash,
			});
			setTxLoading(false);
			return transaction;
		} catch (err) {
			handleTxError(err);
			setTxLoading(false);
			return false;
		}
	};

	return {
		transferERC1155,
		transferERC1155FromERC6551Account,
		tx1155Loading: txLoading,
	};
};

export default useERC1155Transfer;
