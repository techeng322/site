import { useRouter } from 'next/router';
import CapsulePage from '@/components/CapsulePage';
import { CapsuleProvider } from '@/providers/CapsuleProvider';

const Page = () => {
	const { query } = useRouter();

	return (
		<CapsuleProvider capsuleId={query.slug}>
			<CapsulePage />
		</CapsuleProvider>
	);
};

export default Page;
