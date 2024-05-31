import { Contract } from 'ethers';
import multicallAbi from '../lib/abi/multicall3.json';
import usePrepareForTx from './usePrepareForTransaction';
import useTotalSupply from './useTotalSupply';
import { CAPSULE_DROP_ADDRESS, MULTICALL3_ADDRESS } from '@/lib/consts';
import getZoraNextTokenId from '@/lib/zora/getZoraNextTokenId';
import handleTxError from '@/lib/handleTxError';
import getPresaleCalls from '@/lib/zora/getPresaleCalls';
import getTransferFromCall from '@/lib/zora/getTransferFromCall';
import getInitializeCalls from '@/lib/tokenbound/getInitializeCalls';
import usePrivyEthersSigner from './usePrivyEthersSigner';
import useConnectedWallet from './useConnectedWallet';
import { Address } from 'viem';

const useZoraPurchasePresale = () => {
	const { signer } = usePrivyEthersSigner();
	const { connectedWallet } = useConnectedWallet();
	const { totalSupply } = useTotalSupply(CAPSULE_DROP_ADDRESS);

	const multicallContract = new Contract(
		MULTICALL3_ADDRESS,
		multicallAbi,
		signer
	);

	const { prepare } = usePrepareForTx();

	const purchase = async (quantity: number) => {
		const prepared = prepare();
		if (!prepared) return;
		try {
			const zoraNextTokenId = await getZoraNextTokenId();
			if (!zoraNextTokenId) return;
			const tbaCalls = getPresaleCalls(zoraNextTokenId, quantity);
			const transferFromCalls = [];
			for (let i = 0; i < quantity; i++) {
				const tokenToTransfer = BigInt(zoraNextTokenId) + BigInt(i);
				transferFromCalls.push(
					getTransferFromCall(connectedWallet as Address, tokenToTransfer)
				);
			}
			const initCalls = getInitializeCalls(zoraNextTokenId, quantity);
			const calls = [...tbaCalls, ...transferFromCalls, ...initCalls];
			const transferFromGasFee = 40000 * quantity;
			const registryGasFee = 127777 * quantity;
			const tx = await multicallContract.aggregate3Value(calls, {
				value: tbaCalls[0].value,
				gasLimit: 300000 + transferFromGasFee + registryGasFee,
			});
			const receipt = await tx.wait();
			return receipt;
		} catch (err) {
			handleTxError(err);
			return false;
		}
	};

	return { purchase, totalSupply };
};

export default useZoraPurchasePresale;
