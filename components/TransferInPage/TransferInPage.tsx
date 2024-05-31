import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SmartWalletAddress from '../CapsulePage/SmartWalletAddress';
import TrackGrid from './TrackGrid';
import { PageLayout } from '@/components/PageLayout';
import useConnectedWallet from '@/hooks/useConnectedWallet';
import usePrivyEthersSigner from '@/hooks/usePrivyEthersSigner';

export default function TransferInPage() {
	const { query } = useRouter();
	const { connectedWallet } = useConnectedWallet();
	const { signer } = usePrivyEthersSigner();

	return (
		<PageLayout>
			<Head>
				<title>Transfer in – Sound Capsules</title>
			</Head>
			<section className="pt-24 pb-48">
				<h1 className="font-size-text text-center text-black">Transfer in</h1>
			</section>
			<section className="border-t pt-4 space-y-16">
				<div className="flex justify-between items-center">
					<div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
						<h2 className="font-size-text text-center text-black">
							Connected wallet
						</h2>
						<div>
							{connectedWallet && signer && (
								<SmartWalletAddress address={connectedWallet} />
							)}
						</div>
					</div>
					<Link
						className="py-2 px-4 bg-black text-white rounded-2xl"
						href={`/manage/${query.slug}`}
					>
						Done
					</Link>
				</div>
				<TrackGrid />
			</section>
		</PageLayout>
	);
}
