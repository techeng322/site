import { Contract } from 'ethers';
import erc721Abi from '../lib/abi/zora-erc721-drop.json';
import handleTxError from '@/lib/handleTxError';
import { useState } from 'react';
import { CHAIN_ID } from '@/lib/consts';
import useTokenboundWalletClient from './useTokenboundWalletClient';
import { Address, encodeFunctionData } from 'viem';
import { getPublicClient } from '@/lib/clients';
import usePrepareForTx from './usePrepareForTransaction';
import usePrivyEthersSigner from './usePrivyEthersSigner';

const useERC721Transfer = () => {
	const { signer } = usePrivyEthersSigner();
	const { prepare } = usePrepareForTx();
	const [txLoading, setTxLoading] = useState(false);
	const { tokenboundClient } = useTokenboundWalletClient();

	const transferERC721 = async (
		erc721Address: string,
		from: string,
		to: string,
		tokenId: any
	) => {
		setTxLoading(true);
		try {
			const contract = new Contract(erc721Address, erc721Abi, signer);
			const tx = await contract.transferFrom(from, to, tokenId);
			const receipt = await tx.wait();
			setTxLoading(false);
			return receipt;
		} catch (err) {
			setTxLoading(false);
			handleTxError(err);
			return { err };
		}
	};

	const transferERC721FromERC6551Account = async (
		tokenBoundAccount: Address,
		erc721Address: Address,
		to: Address,
		tokenId: number,
		chainId: number = CHAIN_ID
	) => {
		if (!prepare()) return { err: 'missing signer' };
		try {
			setTxLoading(true);
			const data = encodeFunctionData({
				functionName: 'transferFrom',
				abi: erc721Abi,
				args: [tokenBoundAccount, to, tokenId],
			});
			if (!tokenboundClient) return { err: 'tokenboundClient is null' };
			const hash = await tokenboundClient.execute({
				account: tokenBoundAccount as Address,
				to: erc721Address,
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
		transferERC721,
		transferERC721FromERC6551Account,
		tx721Loading: txLoading,
	};
};

export default useERC721Transfer;
