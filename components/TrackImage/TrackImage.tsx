import ChainIcon from '../ChainIcon';
import getTrackId from '@/lib/getTrackId';
import { Track } from '@/lib/types';
import { useMusicProvider } from '@/providers/PlayerProvider';

const TrackImage = ({ track }: { track: Track }) => {
	const { togglePlay, isPlaying, activeTrackId } = useMusicProvider();
	const trackChainId = track?.token?.chainId;
	const tokenType = track?.token?.type;
	const is1155Token = tokenType === 'ERC1155';
	const trackActive = activeTrackId === getTrackId(track);

	return (
		<div className="relative overflow-hidden rounded-2xl pb-[100%]">
			<img
				src={track.meta.cover}
				alt="Track cover"
				className="absolute h-full w-full object-cover bg-gray-light"
			/>
			<ChainIcon className="absolute top-2 left-2" chainId={trackChainId} />
			{is1155Token && track?.token?.editions ? (
				<div className="absolute flex items-center justify-center top-2 right-2 bg-gray-overlay text-white rounded-xs flex items center h-6 pt-1 px-2 font-size-small line-height-1 rounded-md">
					{track?.token?.editions}
				</div>
			) : null}
			<button
				aria-label={isPlaying ? 'Pause track' : 'Play track'}
				className="absolute bottom-2 right-2 inline-flex justify-center items-center w-10 h-10 text-white rounded-full bg-gray-overlay backdrop-blur-xl"
				onClick={() => togglePlay(track)}
			>
				{isPlaying && trackActive ? <PauseIcon /> : <PlayIcon />}
			</button>
		</div>
	);
};

export default TrackImage;

const PlayIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M19.25 11.567C19.5833 11.7594 19.5833 12.2406 19.25 12.433L7.25 19.3612C6.91667 19.5537 6.5 19.3131 6.5 18.9282L6.5 5.0718C6.5 4.6869 6.91667 4.44633 7.25 4.63878L19.25 11.567Z"
			className="strokw-"
			stroke="white"
		/>
	</svg>
);

const PauseIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect x="6.5" y="4.5" width="3" height="15" rx="0.5" stroke="white" />
		<rect x="14.5" y="4.5" width="3" height="15" rx="0.5" stroke="white" />
	</svg>
);
