import toast from 'react-hot-toast';
import { Address } from 'viem';
import { useState } from 'react';
import useERC721Transfer from '@/hooks/useERC721Transfer';
import { useCapsuleProvider } from '@/providers/CapsuleProvider';
import Button from '@/components/Button';
import updateToast from '@/lib/updateToast';
import useERC1155Transfer from '@/hooks/useERC1155Transfer';
import usePrepareLayer2Transfer from '@/hooks/usePrepareLayer2Transfer';
import useConnectedWallet from '@/hooks/useConnectedWallet';

const RemoveTrackButton = ({ track, onSuccess }: any) => {
	const trackAddress = track?.token?.contractAddress;
	const tokenId = track?.token?.id;
	const chainId = track?.token?.chainId;
	const type = track?.token?.type;
	const { connectedWallet } = useConnectedWallet();
	const { capsuleAddress } = useCapsuleProvider();
	const { transferERC721FromERC6551Account } = useERC721Transfer();
	const { transferERC1155FromERC6551Account } = useERC1155Transfer();
	const [loading, setLoading] = useState(false);
	const { prepare } = usePrepareLayer2Transfer();

	const handleClick = async () => {
		setLoading(true);
		const toastId = toast('Removing track from capsule...');
		let response;
		if (type === 'ERC1155') {
			response = await transferERC1155FromERC6551Account(
				capsuleAddress,
				trackAddress,
				connectedWallet as Address,
				tokenId
			);
			setLoading(false);
			return;
		} else {
			const isCapsuleReady = await prepare(chainId, toastId);
			if (!isCapsuleReady) {
				setLoading(false);
				return;
			}
			response = await transferERC721FromERC6551Account(
				capsuleAddress,
				trackAddress,
				connectedWallet as Address,
				tokenId,
				chainId
			);
		}
		if ((response as any).err) {
			toast.dismiss(toastId);
			setLoading(false);
			return;
		}
		updateToast(toastId, 'Removed track! Reloading capsule...');
		setLoading(false);
		onSuccess();
	};

	return (
		<Button
			onClick={handleClick}
			variant="secondary"
			disabled={loading}
			className={`${
				loading ? 'cursor-not-allowed text-gray' : 'cursor-pointer'
			}`}
		>
			{loading ? 'Removing...' : 'Remove track'}
		</Button>
	);
};

export default RemoveTrackButton;
