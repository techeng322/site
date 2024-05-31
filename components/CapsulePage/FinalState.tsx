import { Fragment, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PageLayout } from '../PageLayout';
import CapsuleIframe from '../CapsuleIframe/CapsuleIframe';
import DragNDropReorder from '../DragNDropReorder';
import ButtonLink from '../ButtonLink';
import SmartWalletAddress from './SmartWalletAddress';
import CapsuleTrackList from './CapsuleTrackList';
import { Capsule } from '@/lib/types';
import { useCapsuleProvider } from '@/providers/CapsuleProvider';
import { OPENSEA_COLLECTION_URL } from '@/lib/consts';

const FinalState = ({ capsule }: { capsule: Capsule }) => {
	const { query } = useRouter();
	const iframeRef = useRef(null) as any;

	const [editing, setEditing] = useState(false);
	const { saveOrder } = useCapsuleProvider();

	// TODO: Is this correct?
	const orderedTracks = [{}];

	const handleClick = () => {
		const savePromise = async () => {
			await saveOrder();
			refreshIframe();
		};

		if (editing) {
			toast.promise(savePromise(), {
				loading: 'Saving...',
				success: 'Saved!',
				error: 'Something went wrong. Please try again.',
			});
		}
		setEditing(!editing);
	};

	const refreshIframe = () => {
		if (!iframeRef?.current) return;
		const originSrc = iframeRef.current.src;
		iframeRef.current.src = 'about:blank';
		setTimeout(() => {
			iframeRef.current.src = originSrc;
		}, 100);
	};

	return (
		<PageLayout>
			<Head>
				<title>{capsule.meta.name ?? 'Capsule wallet'} – Sound Capsules</title>
			</Head>
			<div className="space-y-24">
				<section className="space-y-8 text-center max-w-4xl mx-auto">
					<CapsuleIframe tokenId={capsule.capsuleId} iframeRef={iframeRef} />
					<ButtonLink
						variant="secondary"
						href={`${OPENSEA_COLLECTION_URL}/${capsule.capsuleId}`}
						target="_blank"
					>
						Opensea
					</ButtonLink>
				</section>
				<section className="border-t pt-4 space-y-16">
					<div className="flex justify-between items-start md:items-center">
						<div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
							<h2 className="font-size-text text-black">
								{capsule.meta.name ?? 'Capsule wallet'}
							</h2>
							<SmartWalletAddress address={capsule.address} />
						</div>
						{editing ? (
							<div className="flex gap-2">
								<button
									onClick={() => setEditing(false)}
									className="py-2 px-4 bg-gray-light text-black rounded-2xl"
								>
									Cancel
								</button>
								<button
									onClick={handleClick}
									className="py-2 px-4 bg-black text-white rounded-2xl"
								>
									Save order
								</button>
							</div>
						) : (
							<div className="flex gap-2">
								{orderedTracks.length > 0 && (
									<button
										onClick={handleClick}
										className="py-2 px-4 bg-gray-light text-black rounded-2xl"
									>
										Reorder
									</button>
								)}
								<Link
									href={`/manage/${query.slug}/transfer-in`}
									className="py-2 px-4 bg-black text-white rounded-2xl"
								>
									Transfer in
								</Link>
							</div>
						)}
					</div>
					{orderedTracks.length > 0 ? (
						<Fragment>
							{editing ? <DragNDropReorder /> : <CapsuleTrackList />}
						</Fragment>
					) : (
						<div className="text-center max-w-xl mx-auto py-24 space-y-2">
							<div className="font-size-text text-black">Empty</div>
							<p>
								There are no audio NFTs in your Sound Capsule smart wallet,
								transfer audio NFTs from your wallet to add them to your
								playlist.
							</p>
						</div>
					)}
				</section>
			</div>
		</PageLayout>
	);
};

export default FinalState;
