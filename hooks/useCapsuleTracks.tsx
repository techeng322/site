import { useCallback, useEffect, useState } from 'react';
import useMusicNfts from './useMusicNfts';
import { Track } from '@/lib/types';
import { getCapsuleTracks } from '@/lib/firebase/getCapsuleTracks';
import setCapsuleTracks from '@/lib/firebase/setCapsuleTracks';
import getSortedTracks from '@/lib/getSortedTracks';

const useCapsuleTracks = (capsuleAddress: string) => {
	const [orderedTracks, setOrderedTracks] = useState<Track[]>([]);
	const [loading, setLoading] = useState(false);
	const { nfts: nftsOnchain, loading: loadingOnchain } =
		useMusicNfts(capsuleAddress);

	const refetch = useCallback(async () => {
		setLoading(true);
		const response = await getCapsuleTracks(capsuleAddress);
		setOrderedTracks(getSortedTracks(nftsOnchain, response));
		setLoading(false);
	}, [capsuleAddress, nftsOnchain]);

	useEffect(() => {
		if (!capsuleAddress || loadingOnchain) return;
		refetch();
	}, [capsuleAddress, loadingOnchain, nftsOnchain, refetch]);

	const saveOrder = async () => {
		await setCapsuleTracks(capsuleAddress, orderedTracks);
		await refetch();
	};

	return { orderedTracks, loading, setOrderedTracks, saveOrder };
};

export default useCapsuleTracks;
