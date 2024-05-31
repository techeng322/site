import { PageLayout } from '@/components/PageLayout';
import ButtonLink from '@/components/ButtonLink';
import MintSection from '@/components/MintSection';

const Home = () => {
	return (
		<PageLayout>
			<div className="max-w-2xl mx-auto space-y-24">
				<section className="flex flex-col items-center space-y-8 text-center">
					<h1 className="font-size-headline text-black">
						A simple audio player for creating token bound playlists
					</h1>
					<ButtonLink
						href={process.env.NEXT_PUBLIC_OPENSEA}
						variant="secondary"
						target="_blank"
					>
						View collection
					</ButtonLink>
				</section>
				<section>
					<video
						className="rounded-2xl"
						controls={false}
						playsInline
						loop
						autoPlay
						muted
					>
						<source src="/capsule-preview.mp4" type="video/mp4" />
					</video>
				</section>
				<section>
					<MintSection />
				</section>
				<section className="space-y-6 max-w-lg mx-auto">
					<ul className="space-y-4">
						<Card
							title="Curate playlists"
							description="Easily create and manage playlists for others to listen or purchase as an NFT."
						/>
						<Card
							title="Listen anywhere"
							description="Capsules can be played in any wallet app or marketplace that supports dynamic NFTs."
						/>
						<Card
							title="Update anytime"
							description="Audio NFTs are stored inside each Capsule's token bound account until removed or sold."
						/>
					</ul>
				</section>
			</div>
		</PageLayout>
	);
};

export default Home;

function Card({ title, description }: { title: string; description: string }) {
	return (
		<li className="bg-gray-light p-7 rounded-2xl space-y-2">
			<h2 className="text-black">{title}</h2>
			<p>{description}</p>
		</li>
	);
}
