import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { Address } from 'viem';
import { useCapsuleProvider } from '@/providers/CapsuleProvider';
import useERC721Transfer from '@/hooks/useERC721Transfer';
import updateToast from '@/lib/updateToast';
import useConnectedWallet from '@/hooks/useConnectedWallet';

const AddTrackButton = ({ isSelected = false, nft }: any) => {
	const { transferERC721 } = useERC721Transfer();
	const { connectedWallet } = useConnectedWallet();
	const { capsuleAddress } = useCapsuleProvider();
	const { reload } = useRouter();

	const handleClick = async () => {
		const toastId = toast('Adding track…');
		const response = await transferERC721(
			nft.token.contractAddress,
			connectedWallet as Address,
			capsuleAddress,
			nft.token.id
		);
		if (response) {
			updateToast(toastId, 'Track added');
			reload();
		}
		toast.dismiss(toastId);
	};

	return (
		<button
			className={[
				'ml-auto text-white h-12 w-12',
				isSelected ? 'bg-gray' : 'bg-black',
			].join(' ')}
			onClick={handleClick}
			disabled={isSelected}
		>
			+
		</button>
	);
};

export default AddTrackButton;
