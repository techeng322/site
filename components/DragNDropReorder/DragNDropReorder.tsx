import { toast } from 'react-hot-toast';
import { SortableList } from './SortableList';
import { Track } from '@/lib/types';
import { useCapsuleProvider } from '@/providers/CapsuleProvider';
import Button from '@/components/Button';
import formatTime from '@/lib/formatTime';

type TrackWithId = Track & { id: string };

const DragNDropReorder = () => {
	const { orderedTracks = [], setOrderedTracks } = useCapsuleProvider();

	const tracksWithIds: TrackWithId[] = orderedTracks.map(
		(track: Track, index: number) => ({
			...track,
			// @ts-ignore
			id: track.id ?? `${track.token.id}-${index}`,
		})
	);

	const onTransferOutClick = () => {
		toast('TODO. Implement.', {});
	};

	return (
		<SortableList<TrackWithId>
			items={tracksWithIds}
			onChange={setOrderedTracks}
			renderItem={(track) => (
				<SortableList.Item id={track.id}>
					<div className="space-y-4">
						<div className="relative overflow-hidden rounded-2xl pb-[100%]">
							<img
								src={track.meta.cover}
								alt="Track cover"
								className="absolute h-full w-full object-cover bg-gray-light"
							/>
						</div>
						<div className="space-y-2">
							<span className="block text-black truncate">
								{track.meta.name}
							</span>
							<span className="block font-size-small">
								{formatTime(track.meta.duration) || '-'}
							</span>
						</div>
						<Button
							variant="secondary"
							onClick={() => onTransferOutClick()}
							className="self-start"
						>
							Transfer out
						</Button>
					</div>
				</SortableList.Item>
			)}
		/>
	);
};

export default DragNDropReorder;
