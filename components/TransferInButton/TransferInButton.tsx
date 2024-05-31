import { useState } from 'react';
import toast from 'react-hot-toast';
import { Address } from 'viem';
import Button from '../Button';
import { useCapsuleProvider } from '@/providers/CapsuleProvider';
import useERC721Transfer from '@/hooks/useERC721Transfer';
import usePrepareForTx from '@/hooks/usePrepareForTransaction';
import useERC1155Transfer from '@/hooks/useERC1155Transfer';
import { CATALOGCOSIGN_ADDRESS } from '@/lib/consts';
import useConnectedWallet from '@/hooks/useConnectedWallet';
import handleTxError from '@/lib/handleTxError';

const TransferInButton = ({ track, onSuccess }: any) => {
	const { transferERC721 } = useERC721Transfer();
	const { transferERC1155 } = useERC1155Transfer();
	const { connectedWallet, chainId } = useConnectedWallet();
	const { capsuleAddress } = useCapsuleProvider();
	const trackChainId = track?.token?.chainId;
	const isCorrectNetwork = chainId === trackChainId;
	const { prepare } = usePrepareForTx();
	const [loading, setLoading] = useState(false);

	const buttonLabel = isCorrectNetwork ? 'Transfer in' : 'Switch network';

	const handleClick = async () => {
		try {
			const prepared = await prepare(trackChainId);
			if (!prepared) return;
			setLoading(true);
			const { type, contractAddress } = track.token;
			if (contractAddress === CATALOGCOSIGN_ADDRESS) {
				toast('Catalog Cosigns are non-transferrable.');
				setLoading(false);
				return;
			}
			let response;
			if (type === 'ERC1155') {
				response = await transferERC1155(
					track.token.contractAddress,
					connectedWallet as Address,
					capsuleAddress,
					track.token.id
				);
			} else {
				response = await transferERC721(
					track.token.contractAddress,
					connectedWallet as Address,
					capsuleAddress,
					track.token.id
				);
			}
			if (response.err) {
				setLoading(false);
				return;
			} else {
				toast('Success');
				setLoading(false);
			}
			onSuccess();
		} catch (error) {
			handleTxError(error);
			setLoading(false);
		}
	};

	return (
		<Button
			variant="secondary"
			onClick={handleClick}
			disabled={loading}
			className={`${
				loading ? 'cursor-not-allowed text-gray' : 'cursor-pointer'
			}`}
		>
			{loading ? 'Transferring...' : buttonLabel}
		</Button>
	);
};

export default TransferInButton;
