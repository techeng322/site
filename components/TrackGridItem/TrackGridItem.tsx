import { useRouter } from 'next/router';
import TrackPlayer from '../TrackPlayer.tsx/TrackPlayer';
import TransferInButton from '../TransferInButton';
import RemoveTrackButton from '../RemoveTrackButton';

const TrackGridItem = ({ inCapsule = false, track }: any) => {
	const { reload } = useRouter();

	return (
		<div className="space-y-4 relative">
			<TrackPlayer track={track} />
			{inCapsule ? (
				<RemoveTrackButton track={track} onSuccess={reload} />
			) : (
				<TransferInButton track={track} onSuccess={reload} />
			)}
		</div>
	);
};

export default TrackGridItem;
