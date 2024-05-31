import Head from 'next/head';
import CapsulesGrid from './CapsulesGrid';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';
import LoadingState from './LoadingState';
import { PageLayout } from '@/components/PageLayout';
import useManagePage from '@/hooks/useManagePage';

export default function ManagePage() {
	const { data, error, loading } = useManagePage();

	return (
		<PageLayout>
			<Head>
				<title>Manage – Sound Capsules</title>
			</Head>
			<h1 className="sr-only">Capsules</h1>
			<section className="w-full space-y-16 flex flex-col flex-grow-1">
				{error ? (
					<ErrorState />
				) : data?.capsules?.length ? (
					<CapsulesGrid capsules={data?.capsules} />
				) : loading ? (
					<LoadingState />
				) : (
					<EmptyState />
				)}
			</section>
		</PageLayout>
	);
}
