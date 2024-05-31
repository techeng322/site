import { useCallback, useEffect, useState } from 'react';
import { Track } from '@/lib/types';
import getMusicNfts from '@/lib/getMusicNfts';
import useConnectedWallet from './useConnectedWallet';
import { Address } from 'viem';

const useSmartWalletMusicNfts = () => {
	const { connectedWallet } = useConnectedWallet();
	const [musicNfts, setMusicNfts] = useState<Track[]>([]);
	const [musicLoading, setMusicLoading] = useState(false);

	const refreshSWNfts = useCallback(async () => {
		if (!connectedWallet) return;
		setMusicLoading(true);
		const response = await getMusicNfts(connectedWallet as Address);
		setMusicNfts(response);
		setMusicLoading(false);
	}, [connectedWallet]);

	useEffect(() => {
		refreshSWNfts();
	}, [refreshSWNfts]);

	return {
		musicLoading,
		musicNfts,
		refreshSWNfts,
	};
};

export default useSmartWalletMusicNfts;
