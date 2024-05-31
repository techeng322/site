import { PageLayout } from '../PageLayout';

const LoadingState = () => (
	<PageLayout>
		<div className="flex justify-center">
			<div className="max-w-4xl w-full mx-auto">
				<div
					className="bg-gray-light animate-pulse"
					style={{ paddingBottom: '100%' }}
				/>
			</div>
		</div>
	</PageLayout>
);

export default LoadingState;
