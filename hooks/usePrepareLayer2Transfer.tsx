import updateToast from '@/lib/updateToast';
import isDeployedContract from '@/lib/isDeployedContract';
import { useCapsuleProvider } from '@/providers/CapsuleProvider';
import getImplementationAddress from '@/lib/getImplementationAddress';
import usePrepareForTx from './usePrepareForTransaction';
import { CHAIN_ID } from '@/lib/consts';
import getRegistryCall from '@/lib/tokenbound/getRegistryCall';
import getInitializeCall from '@/lib/tokenbound/getInitializeCall';
import useMulticall3 from './useMulticall3';
import getViemNetwork from '@/lib/utils/getViemNetwork';
import { getPublicClient } from '@/lib/clients';
import { Address } from 'viem';

const usePrepareLayer2Transfer = () => {
	const { capsuleAddress, capsuleId } = useCapsuleProvider();
	const { prepare: prepareForTx } = usePrepareForTx();
	const { aggregate3Value } = useMulticall3();

	const registerAndInit = async (toastId: any, chainId: any) => {
		try {
			const isDeployed = await isDeployedContract(capsuleAddress, chainId);
			const isInitialized = await getImplementationAddress(
				capsuleAddress,
				chainId
			);
			if (!isDeployed || !isInitialized) {
				updateToast(toastId, `creating capsule on chainId ${chainId}`);
				const preparedTx = await prepareForTx(chainId);
				if (!preparedTx) return false;
				const registryCall = getRegistryCall(capsuleId);
				const initCall = getInitializeCall(capsuleAddress);
				const hash = await aggregate3Value(
					[registryCall, initCall],
					getViemNetwork(chainId)
				);
				if ((hash as any).err) return false;
				await getPublicClient(chainId).waitForTransactionReceipt({
					hash: hash as Address,
				});
			}
			return true;
		} catch (err) {
			console.error(err);
			return { err };
		}
	};

	const prepare = async (chainId: number, toastId: any) => {
		const isChainPrepared = await registerAndInit(toastId, chainId);
		if (!isChainPrepared) return false;
		const isMainPrepared = await registerAndInit(toastId, CHAIN_ID);
		if (!isMainPrepared) return false;
		return true;
	};

	return { prepare };
};

export default usePrepareLayer2Transfer;
