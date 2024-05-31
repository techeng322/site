import Head from 'next/head';
import { PageLayout } from '@/components/PageLayout';

export default function Collection() {
	return (
		<PageLayout>
			<Head>
				<title>Collection – Sound Capsules</title>
			</Head>
			<section className="max-w-2xl mx-auto space-y-16 text-center">
				<h1 className="font-size-lg">Collection</h1>
				<a
					className="inline-block text-blue-500 underline"
					href={process.env.NEXT_PUBLIC_OPENSEA}
				>
					View on OpenSea
				</a>
			</section>
		</PageLayout>
	);
}
