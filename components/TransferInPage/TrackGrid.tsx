import { Address } from 'viem';
import TrackGridItem from '../TrackGridItem';
import useMusicNfts from '@/hooks/useMusicNfts';
import useConnectedWallet from '@/hooks/useConnectedWallet';

export default function TrackGrid() {
	const { connectedWallet } = useConnectedWallet();
	const { loading, nfts } = useMusicNfts(connectedWallet as Address);

	if (loading) {
		return (
			<ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
				{Array.from(Array(5).keys()).map((idx) => (
					<TrackGridItemLoading key={idx} />
				))}
			</ul>
		);
	}

	if (nfts.length <= 0) {
		return (
			<div className="text-center max-w-xl mx-auto py-24 space-y-1">
				<div className="font-size-text text-black">No audio NFTs</div>
				<p>
					There are no audio NFTs in your wallet we can detect, you can only
					send NFTs from the owner wallet of your Capsule.
				</p>
			</div>
		);
	}

	return (
		<div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
			{nfts?.map((track) => (
				<TrackGridItem
					track={track}
					key={`${track.token.contractAddress}-${track.token.id}`}
				/>
			))}
		</div>
	);
}

function TrackGridItemLoading() {
	return (
		<li className="space-y-2">
			<div className="h-60 w-full bg-gray-light animate-pulse" />
			<div className="h-10 w-full bg-gray-light animate-pulse" />
		</li>
	);
}
