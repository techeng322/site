import { Track } from '@/lib/types';
import { useCallback, useEffect, useState } from 'react';
import { useCapsuleProvider } from '@/providers/CapsuleProvider';
import get721OwnerOf from '@/lib/get721OwnerOf';
import getBalanceOf from '@/lib/getBalanceOf';
import useMusicDuration from './useMusicDuration';
import useConnectedWallet from './useConnectedWallet';

const useTrackData = (track: Track, inCapsule: boolean) => {
	const { connectedWallet } = useConnectedWallet();
	const { capsuleAddress } = useCapsuleProvider();
	const [is721, setIs721] = useState(false);
	const [editions, setEditions] = useState(0);
	const { duration } = useMusicDuration(track.meta.animationUrl);
	const hasTrack = (is721 || editions > 0) && duration;

	const token721Owned = async (chainId: number) => {
		if (track?.token?.type !== 'ERC721') return;
		const owner = await get721OwnerOf(
			track.token.contractAddress,
			track.token.id,
			chainId
		);
		setIs721(inCapsule ? owner === capsuleAddress : owner === connectedWallet);
	};

	const getEditions = async (chainId: number) => {
		if (track?.token?.type !== 'ERC1155') return;
		const editions = await getBalanceOf(
			track.token.contractAddress,
			inCapsule ? capsuleAddress : connectedWallet,
			track?.token?.id,
			chainId
		);
		setEditions(editions);
	};

	const refresh = useCallback(async () => {
		if (!track || !connectedWallet || !capsuleAddress) return;
		const chainId = track?.token?.chainId;
		if (!chainId) return;

		await token721Owned(chainId);
		await getEditions(chainId);
	}, [track, capsuleAddress, connectedWallet]);

	useEffect(() => {
		refresh();
	}, [refresh]);

	return {
		is721,
		editions,
		refresh,
		hasTrack,
		duration,
	};
};

export default useTrackData;
