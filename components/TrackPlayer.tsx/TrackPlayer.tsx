import { Fragment } from 'react';
import TrackImage from '../TrackImage';
import formatTime from '@/lib/formatTime';
import useMusicDuration from '@/hooks/useMusicDuration';

const TrackPlayer = ({ track }: any) => {
	const { duration } = useMusicDuration(track?.meta?.animationUrl);

	return (
		<Fragment>
			<>
				<TrackImage track={track} />
				<div className="space-y-2">
					<span className="block text-black truncate">{track.meta.name}</span>
					<span className="block font-size-small">
						{formatTime(duration) || '-'}
					</span>
				</div>
			</>
		</Fragment>
	);
};

export default TrackPlayer;
