import '@/styles/globals.css';
import { type PrivyClientConfig, PrivyProvider } from '@privy-io/react-auth';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import toast, { Toaster, resolveValue } from 'react-hot-toast';
import { MusicProvider } from '@/providers/PlayerProvider';

const privyConfig: PrivyClientConfig = {
	loginMethods: ['wallet'],
	appearance: {
		theme: 'dark',
		accentColor: '#FFFFFF',
		logo: '/favicon.ico',
	},
	embeddedWallets: {
		createOnLogin: 'users-without-wallets',
	},
};

const App = ({ Component, pageProps }: AppProps) => (
	<PrivyProvider
		appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
		config={privyConfig}
	>
		<Head>
			<title>Sound Capsules</title>
			<meta property="og:image" content="/sc-og.png" />
			<meta
				name="description"
				content="A simple audio player for creating token bound playlists"
			/>
		</Head>
		<MusicProvider>
			<Component {...pageProps} />
		</MusicProvider>
		<Toaster toastOptions={{ position: 'bottom-center' }}>
			{(t) => (
				<div
					className="bg-black text-white rounded-xl px-5 py-4 flex gap-6"
					style={{ opacity: t.visible ? 1 : 0 }}
				>
					<span>{resolveValue(t.message, t)}</span>
					<button
						type="button"
						onClick={() => toast.dismiss(t.id)}
						className="opacity-60 hover:opacity-100"
					>
						close
					</button>
				</div>
			)}
		</Toaster>
	</PrivyProvider>
);

export default App;
