import { useWallets } from '@privy-io/react-auth';
import { useMemo } from 'react';

const useConnectedWallet = () => {
	const { wallets } = useWallets();
	const externalWallets = useMemo(
		() => wallets?.filter((wallet) => wallet.walletClientType !== 'privy'),
		[wallets]
	);
	const externalWallet = externalWallets?.length ? externalWallets[0] : null;
	const connectedWallet = externalWallet?.address;
	const chainId = parseInt(
		externalWallet?.chainId.replaceAll('eip155:', '') || '',
		10
	);

	return {
		connectedWallet,
		wallet: externalWallet,
		chainId,
	};
};

export default useConnectedWallet;
