import { usePrivy } from '@privy-io/react-auth';
import { Address } from 'viem';
import ChainIcon from '../ChainIcon';
import useConnectedWallet from '@/hooks/useConnectedWallet';
import truncateEthAddress from '@/lib/truncateEthAddress';

const SignButton = ({ className = '' }) => {
	const { authenticated, logout, login, ready } = usePrivy();
	const { connectedWallet, chainId } = useConnectedWallet();

	const handleClick = () => {
		if (authenticated) {
			logout();
			return;
		}

		login();
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className={`flex items-center gap-2 ${className}`}
		>
			{!ready || !authenticated || !connectedWallet ? (
				'Connect'
			) : (
				<>
					<ChainIcon chainId={chainId} className="w-[20px] aspect-square" />
					{`${truncateEthAddress(connectedWallet as Address)}`}
				</>
			)}
		</button>
	);
};

export default SignButton;
