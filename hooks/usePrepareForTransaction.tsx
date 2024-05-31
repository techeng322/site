import { CHAIN_ID } from '@/lib/consts';
import useConnectedWallet from './useConnectedWallet';
import { usePrivy } from '@privy-io/react-auth';

const usePrepareForTx = () => {
	const {
		chainId: privyChainId,
		wallet,
		connectedWallet,
	} = useConnectedWallet();
	const { authenticated, login, ready } = usePrivy();

	const prepare = async (chainId = CHAIN_ID) => {
		if (!wallet || !connectedWallet || !authenticated || !ready) {
			login();
			return false;
		}
		if (privyChainId != chainId) {
			await wallet.switchChain(chainId);
			return false;
		}
		return true;
	};

	return {
		prepare,
	};
};

export default usePrepareForTx;
