import { useRouter } from 'next/router';
import TransferInPage from '@/components/TransferInPage';
import { CapsuleProvider } from '@/providers/CapsuleProvider';

export default function Page() {
	const { query } = useRouter();

	return (
		<CapsuleProvider capsuleId={query.slug}>
			<TransferInPage />
		</CapsuleProvider>
	);
}
