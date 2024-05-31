import { Address, Chain, WalletClient } from 'viem';
import { CHAIN, MULTICALL3_ADDRESS } from '@/lib/consts';
import abi from '@/lib/abi/multicall3.json';
import useWalletClient from './useWalletClient';
import useConnectedWallet from './useConnectedWallet';

const useMulticall3 = () => {
	const { walletClient } = useWalletClient();
	const { connectedWallet } = useConnectedWallet();

	const aggregate3Value = async (calls: any[], chain: Chain = CHAIN) => {
		if (!walletClient || !connectedWallet)
			return { err: 'missing wallet client' };
		try {
			const tx = await (walletClient as WalletClient).writeContract({
				address: MULTICALL3_ADDRESS,
				abi,
				functionName: 'aggregate3Value',
				args: [calls],
				account: connectedWallet as Address,
				chain,
			});
			return tx;
		} catch (err) {
			return { err };
		}
	};

	return { aggregate3Value };
};

export default useMulticall3;
