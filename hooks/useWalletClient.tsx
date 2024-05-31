import { useEffect, useState } from 'react';
import useConnectedWallet from './useConnectedWallet';
import { Address, createWalletClient, custom } from 'viem';
import getViemNetwork from '@/lib/utils/getViemNetwork';

const useWalletClient = () => {
	const { wallet, chainId, connectedWallet } = useConnectedWallet();
	const [walletClient, setWalletClient] = useState<any>(null);

	useEffect(() => {
		const init = async () => {
			if (!wallet || !chainId || !connectedWallet) return null;
			const provider = await wallet.getEthereumProvider();
			const client = createWalletClient({
				account: connectedWallet as Address,
				chain: getViemNetwork(chainId),
				transport: custom(provider),
			});

			setWalletClient(client);
		};

		init();
	}, [wallet, chainId, connectedWallet]);

	return { walletClient };
};

export default useWalletClient;
