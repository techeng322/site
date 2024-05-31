import copyToClipboard from '@/lib/copyToClipboard';
import truncateEthAddress from '@/lib/truncateEthAddress';

const SmartWalletAddress = ({ address }: any) => {
	const handleClick = async () => {
		await copyToClipboard(address);
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className="inline-block max-w-2xl h-6 px-2 font-size-small leading-1 text-center border border-gray-200 rounded-full"
		>
			{truncateEthAddress(address)}
		</button>
	);
};

export default SmartWalletAddress;
