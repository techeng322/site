import TrackGridItem from '../TrackGridItem';
import { Track } from '@/lib/types';
import { useCapsuleProvider } from '@/providers/CapsuleProvider';

const CapsuleTrackList = () => {
	const { orderedTracks } = useCapsuleProvider();

	return (
		<ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
			{orderedTracks.map((capsuleTrack: Track) => {
				return (
					<TrackGridItem
						key={capsuleTrack.meta.name}
						inCapsule={true}
						track={capsuleTrack}
					/>
				);
			})}
		</ul>
	);
};

export default CapsuleTrackList;
