import { Address } from 'viem';
import LoadingState from './LoadingState';
import NoAddressState from './NoAddressState';
import FinalState from './FinalState';
import useMusicNfts from '@/hooks/useMusicNfts';
import { useCapsuleProvider } from '@/providers/CapsuleProvider';
import useConnectedWallet from '@/hooks/useConnectedWallet';
import usePrivyEthersSigner from '@/hooks/usePrivyEthersSigner';

const CapsulePage = () => {
	const { connectedWallet } = useConnectedWallet();
	const { nfts, loading } = useMusicNfts(connectedWallet as Address);
	const { capsuleId, capsuleAddress } = useCapsuleProvider();
	const { signer } = usePrivyEthersSigner();

	if (!signer) {
		return <NoAddressState />;
	}

	if (loading || !nfts) {
		return <LoadingState />;
	}

	return (
		<FinalState
			capsule={{
				address: capsuleAddress,
				capsuleId: capsuleId,
				meta: {
					name: `SC-${capsuleId}`,
					tracks: [],
				},
			}}
		/>
	);
};

export default CapsulePage;
