import { useEffect, useState } from 'react';
import useConnectedWallet from './useConnectedWallet';

const usePrivyEthersSigner = () => {
	const { wallet } = useConnectedWallet();
	const [signer, setSigner] = useState<any>(null);

	useEffect(() => {
		const init = async () => {
			if (!wallet) return;
			const provider = await wallet.getEthersProvider();
			const ethSigner = provider.getSigner();
			setSigner(ethSigner);
		};

		init();
	}, [wallet]);

	return { signer };
};

export default usePrivyEthersSigner;
