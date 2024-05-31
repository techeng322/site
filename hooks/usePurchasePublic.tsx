import { Contract } from 'ethers';
import multicallAbi from '../lib/abi/multicall3.json';
import usePrepareForTx from './usePrepareForTransaction';
import useTotalSupply from './useTotalSupply';
import { CAPSULE_DROP_ADDRESS, MULTICALL3_ADDRESS } from '@/lib/consts';
import getZoraNextTokenId from '@/lib/zora/getZoraNextTokenId';
import handleTxError from '@/lib/handleTxError';
import getTransferFromCall from '@/lib/zora/getTransferFromCall';
import getPublicSaleCalls from '@/lib/zora/getPublicSaleCalls';
import getInitializeCalls from '@/lib/tokenbound/getInitializeCalls';
import useConnectedWallet from './useConnectedWallet';
import usePrivyEthersSigner from './usePrivyEthersSigner';

const usePurchasePublic = () => {
	const { signer } = usePrivyEthersSigner() as any;
	const { connectedWallet } = useConnectedWallet();
	const multicallContract = new Contract(
		MULTICALL3_ADDRESS,
		multicallAbi,
		signer
	);
	const { totalSupply } = useTotalSupply(CAPSULE_DROP_ADDRESS);

	const { prepare } = usePrepareForTx();

	const purchase = async (quantity: number) => {
		try {
			const prepared = await prepare();
			if (!prepared) return;

			const zoraNextTokenId = await getZoraNextTokenId();
			if (!zoraNextTokenId) return;
			const tbaCalls = getPublicSaleCalls(zoraNextTokenId, quantity);
			const transferFromCalls = [];
			for (let i = 0; i < quantity; i++) {
				const tokenToTransfer = BigInt(zoraNextTokenId) + BigInt(i);
				transferFromCalls.push(
					getTransferFromCall(connectedWallet as `0x${string}`, tokenToTransfer)
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

export default usePurchasePublic;
