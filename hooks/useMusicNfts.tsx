import { useEffect, useState } from 'react';
import getMusicNfts from '@/lib/getMusicNfts';
import { Track } from '@/lib/types';

const useMusicNfts = (address: string) => {
	const [musicNfts, setMusicNfts] = useState<Track[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const init = async () => {
			setLoading(true);
			const response = await getMusicNfts(address);
			setMusicNfts(response);
			setLoading(false);
		};

		if (!address) return;
		init();
	}, [address]);

	return {
		nfts: musicNfts,
		loading,
	};
};

export default useMusicNfts;
