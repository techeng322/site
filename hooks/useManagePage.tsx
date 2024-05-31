import { useEffect, useState } from 'react';
import getNFTs from '@/lib/alchemy/getNFTs';
import { CAPSULE_DROP_ADDRESS, CHAIN_ID } from '@/lib/consts';
import { Capsule } from '@/lib/types';
import useConnectedWallet from './useConnectedWallet';
import { Address } from 'viem';

function useManagePage() {
	const { connectedWallet } = useConnectedWallet();
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<{ capsules: Capsule[] }>();

	useEffect(() => {
		if (!connectedWallet) {
			setLoading(false);
			return;
		}

		async function init() {
			try {
				const response = await getNFTs(
					connectedWallet as Address,
					CAPSULE_DROP_ADDRESS,
					CHAIN_ID
				);
				const capsules = {
					capsules: response.ownedNfts.map((capsule: any) => {
						const tokenId = parseInt(capsule.tokenId, 10);
						return {
							...capsule,
							address: CAPSULE_DROP_ADDRESS,
							meta: {
								name: `SC-${tokenId > 9 ? tokenId : `0${tokenId}`}`,
								tracks: [],
							},
							capsuleId: tokenId,
						} as Capsule;
					}),
				};
				setData(capsules);
				setLoading(false);
			} catch {
				setError(true);
				return;
			}
		}
		init();
	}, [connectedWallet]);
	return { data, error, loading };
}

export default useManagePage;
