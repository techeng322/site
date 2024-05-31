import { WalletClient } from 'viem';
import { getTokenboundWalletClient } from '@/lib/tokenbound/client';
import { useEffect, useState } from 'react';
import useWalletClient from './useWalletClient';

const useTokenboundWalletClient = () => {
	const { walletClient } = useWalletClient();
	const [tokenboundClient, setTokenboundClient] = useState<any>(null);

	useEffect(() => {
		const init = async () => {
			if (!walletClient) return null;
			const client = getTokenboundWalletClient(walletClient as WalletClient);
			setTokenboundClient(client);
		};

		init();
	}, [walletClient]);

	return { tokenboundClient };
};

export default useTokenboundWalletClient;
