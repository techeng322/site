import updateToast from '@/lib/updateToast';
import usePrepareForTx from './usePrepareForTransaction';
import { useCapsuleProvider } from '@/providers/CapsuleProvider';
import toast from 'react-hot-toast';
import getTBAClient from '@/lib/erc6551/getTBAClient';
import usePrepareLayer2Transfer from './usePrepareLayer2Transfer';
import usePrivyEthersSigner from './usePrivyEthersSigner';
import useConnectedWallet from './useConnectedWallet';
import { Address } from 'viem';

const useRemoveLayerTwoTrackFromCapsule = () => {
	const { prepare: prepareForTx } = usePrepareForTx();
	const { prepare } = usePrepareLayer2Transfer();
	const { capsuleAddress } = useCapsuleProvider();
	const { connectedWallet } = useConnectedWallet();
	const { signer } = usePrivyEthersSigner();

	const removeTrack = async (
		chainId: number,
		trackAddress: string,
		tokenId: string,
		tokenType: any,
		toastId: any
	) => {
		const isCapsuleReady = await prepare(chainId, toastId);
		if (!isCapsuleReady) return;
		updateToast(toastId, `removing song from capsule`);
		try {
			if (!prepareForTx()) return;
			const tokenboundClient = getTBAClient(signer, chainId);
			updateToast(toastId, `confirming...`);
			let transferNFT = '';
			if (tokenType == 'ERC721') {
				transferNFT = await tokenboundClient.transferNFT({
					account: capsuleAddress,
					tokenType: 'ERC721',
					tokenContract: trackAddress as Address,
					tokenId,
					recipientAddress: connectedWallet as Address,
					chainId,
				});
			} else {
				transferNFT = await tokenboundClient.transferNFT({
					account: capsuleAddress,
					tokenType: 'ERC1155',
					tokenContract: trackAddress as Address,
					tokenId,
					recipientAddress: connectedWallet as Address,
					amount: 1,
					chainId,
				});
			}

			updateToast(toastId, 'Removed track! Reloading capsule...');
		} catch (err) {
			toast.dismiss(toastId);
		}
	};

	return { removeTrack };
};

export default useRemoveLayerTwoTrackFromCapsule;
