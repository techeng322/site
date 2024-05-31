import useConnectedWallet from '@/hooks/useConnectedWallet';

const EmptyState = () => {
	const { connectedWallet } = useConnectedWallet();

	if (!connectedWallet) {
		return (
			<div className="max-w-xl mx-auto space-y-2 text-center">
				<h2 className="font-size-text text-black">Wallet not connected</h2>
				<p>
					Your wallet is not connected, once connected you can manage your smart
					wallet from here.
				</p>
			</div>
		);
	}

	return (
		<div className="max-w-xl mx-auto space-y-2 text-center">
			<h2 className="font-size-text text-black">Empty</h2>
			<p>
				There are no capsules in your wallet, once collected you can manage your
				playlists from here.
			</p>
		</div>
	);
};

export default EmptyState;
