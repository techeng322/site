import Head from 'next/head';
import { PageLayout } from '@/components/PageLayout';
import { CAPSULE_DROP_ADDRESS, CHAIN } from '@/lib/consts';

export default function About() {
	return (
		<PageLayout>
			<Head>
				<title>About – Sound Capsules</title>
			</Head>
			<section className="max-w-xl mx-auto space-y-12">
				<div className="space-y-1">
					<h1 className="font-size-small">About</h1>
					<p className="text-black font-size-text line-height-1-5">
						Sound Capsule’s are a collection of 10,000 NFTs on Base chain that
						can be used to curate NFT playlists. Each player is has a token
						bound account (smart wallet) allowing it to own other NFTs.
					</p>
				</div>
				<div className="space-y-1">
					<h2 className="font-size-small">Adding tunes</h2>
					<p className="text-black font-size-text line-height-1-5">
						To add music you must transfer audio NFTs to the Sound Capsule’s
						smart wallet. The easiest way is through the manage page. Each
						transfer in, or transfer out requires and onchain transaction. To
						prevent spam, only the wallet who owns the Sound Capsule NFT can
						transfer audio NFTs in and out.
					</p>
				</div>
				<div className="space-y-1">
					<h2 className="font-size-small">Selling playlists</h2>
					<p className="text-black font-size-text line-height-1-5">
						Each Sound Capsule can be sold as a playlist. All contents will be
						sold with the NFT if sold or transferred to another wallet.
					</p>
				</div>
				<div className="space-y-3">
					<h2 className="font-size-small">Links</h2>
					<ul className="space-y-2">
						<li>
							<a
								className="inline-block py-2 px-4 bg-gray-light text-black rounded-2xl"
								href={process.env.NEXT_PUBLIC_TWITTER!}
								target="_blank"
							>
								Follow
							</a>
						</li>
						<li>
							<a
								className="inline-block py-2 px-4 bg-gray-light text-black rounded-2xl"
								href={process.env.NEXT_PUBLIC_TOKENBOUND!}
								target="_blank"
							>
								Tokenbound
							</a>
						</li>
						<li>
							<a
								className="inline-block py-2 px-4 bg-gray-light text-black rounded-2xl"
								href={process.env.NEXT_PUBLIC_OPENSEA!}
								target="_blank"
							>
								Opensea
							</a>
						</li>
						<li>
							<a
								className="inline-block py-2 px-4 bg-gray-light text-black rounded-2xl"
								href={
									`${CHAIN.blockExplorers.default.url}/address/${CAPSULE_DROP_ADDRESS}`!
								}
								target="_blank"
							>
								Contract
							</a>
						</li>
					</ul>
				</div>
			</section>
		</PageLayout>
	);
}
