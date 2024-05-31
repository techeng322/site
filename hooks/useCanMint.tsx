import usePrivyEthersSigner from './usePrivyEthersSigner';
import useConnectedWallet from './useConnectedWallet';

const useCanMint = () => {
	const { connectedWallet } = useConnectedWallet();
	const { signer } = usePrivyEthersSigner();
	const canMint = connectedWallet && signer;

	return {
		canMint,
	};
};

export default useCanMint;
