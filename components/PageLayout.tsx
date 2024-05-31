import { PropsWithChildren } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

type PageLayoutProps = PropsWithChildren<{}>;

export function PageLayout({ children }: PageLayoutProps) {
	return (
		<div className="flex flex-col h-screen px-4 md:px-6">
			<Header />
			<main className="w-full pt-20 flex-1 flex flex-col">{children}</main>
			<Footer />
		</div>
	);
}
