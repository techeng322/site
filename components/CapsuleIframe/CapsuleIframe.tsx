import { CHAIN_ID } from '@/lib/consts';

const CapsuleIframe = ({
	tokenId,
	iframeRef,
}: {
	tokenId: number;
	iframeRef: any;
}) => (
	<iframe
		className="w-full h-full aspect-square bg-gray-light rounded-xl md:rounded-3xl"
		src={`https://capsules-iframe.vercel.app/${CHAIN_ID}/${process.env.NEXT_PUBLIC_DROP}/${tokenId}`}
		ref={iframeRef}
	/>
);

export default CapsuleIframe;
