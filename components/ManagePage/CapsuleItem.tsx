import Image from 'next/image';
import Link from 'next/link';
import { CAPSULE_DROP_ADDRESS, CHAIN_ID } from '@/lib/consts';
import { Capsule } from '@/lib/types';
import { useEffect, useState } from 'react';

const CapsuleItem = ({ capsule }: { capsule: Capsule }) => {
	const image = `https://capsules-iframe.vercel.app/api/og?tokenId=${encodeURIComponent(capsule?.capsuleId)}&contractAddress=${encodeURIComponent(CAPSULE_DROP_ADDRESS)}&chainId=${encodeURIComponent(CHAIN_ID)}`;
	const [key, setKey] = useState(0);
	const [trackedTime, setTrackedTime] = useState(0);

	useEffect(() => {
		let timeTracker: any;
		if (trackedTime === -1) return;
		if (trackedTime >= 4) {
			setTrackedTime(0);
			setKey((prev) => prev + 1);
			return;
		}
		timeTracker = setInterval(() => setTrackedTime((prev) => prev + 1), 1000);

		return () => clearInterval(timeTracker);
	}, [trackedTime]);

	return (
		<Link href={`/manage/${capsule.capsuleId}`} className="block space-y-4">
			{image ? (
				<div className="aspect-square bg-gray-light rounded-xl">
					<div className="relative aspect-square bg-gray-light rounded-xl overflow-hidden">
						<Image
							key={`${capsule?.address}-${capsule?.capsuleId}-${key}`}
							className={`absolute !w-full object-contain`}
							src={image}
							layout="fill"
							alt="not found image"
							placeholder="blur"
							blurDataURL={image}
							onLoadingComplete={() => setTrackedTime(-1)}
							onError={() => setKey((prevKey) => prevKey + 1)}
						/>
					</div>
				</div>
			) : (
				<div className="space-y-2 animate-pulse ">
					<div className="aspect-square w-full bg-gray-light" />
				</div>
			)}
			<span className="block text-black text-center">{capsule.meta.name}</span>
		</Link>
	);
};

export default CapsuleItem;
