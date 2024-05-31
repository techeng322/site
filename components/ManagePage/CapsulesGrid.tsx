import CapsuleItem from './CapsuleItem';
import { Capsule } from '@/lib/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import Loading from 'react-loading';

const CapsulesGrid = ({ capsules }: { capsules: Capsule[] }) => {
	const [displayedCapsules, setDisplayedCapsules] = useState<any>([]);
	const observerElem = useRef(null);
	const [hasNextPage, setHasNextPage] = useState(true);

	const fetchMore = (start: number) => {
		const patchedCapsules = capsules.slice(start, start + 3);
		if (patchedCapsules.length === 0) {
			setHasNextPage(false);
			return;
		}
		setDisplayedCapsules((prev: any) => {
			const mergedCapsules = [...prev, ...patchedCapsules];
			return mergedCapsules;
		});
		setHasNextPage(true);
	};

	const handleObserver = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			const [target] = entries;
			if (target.isIntersecting && hasNextPage) {
				fetchMore(displayedCapsules.length);
			}
		},
		[displayedCapsules, hasNextPage]
	);

	useEffect(() => {
		if (!observerElem.current) return;
		const element: HTMLDivElement = observerElem.current;
		const option = { threshold: 0 };

		const observer = new IntersectionObserver(handleObserver, option);
		observer.observe(element);
		return () => observer.unobserve(element);
	}, [handleObserver]);

	useEffect(() => {
		fetchMore(0);
	}, [capsules]);

	return (
		<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{displayedCapsules.map((capsule: any) => (
				<li key={`${capsule.address}${capsule.capsuleId}`}>
					<CapsuleItem capsule={capsule} />
				</li>
			))}
			{hasNextPage && (
				<div className="w-full flex justify-center mt-4 col-span-3">
					<Loading width={40} height={40} type="spin" color="black" />
				</div>
			)}
			<div ref={observerElem} className="w-full h-4 col-span-3" />
		</ul>
	);
};

export default CapsulesGrid;
