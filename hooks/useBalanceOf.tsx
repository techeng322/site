import { getPublicClient } from '@/lib/clients';
import { CHAIN_ID } from '@/lib/consts';
import { useEffect, useState } from 'react';
import useConnectedWallet from './useConnectedWallet';
import { Address } from 'viem';
import erc721ABI from '@/lib/abi/ERC721.json';

const useBalanceOfERC721 = ({
	contractAddress,
}: {
	contractAddress: string;
}) => {
	const [balanceOf, setBalanceOf] = useState(0);
	const { connectedWallet } = useConnectedWallet();

	useEffect(() => {
		const init = async () => {
			const publicClient = getPublicClient(CHAIN_ID);
			const response = (await publicClient.readContract({
				address: contractAddress as Address,
				abi: erc721ABI,
				functionName: 'balanceOf',
				args: [connectedWallet as Address],
			})) as BigInt;

			setBalanceOf(parseInt(response.toString(), 10));
		};

		if (!connectedWallet || !contractAddress) {
			setBalanceOf(0);
			return;
		}
		init();
	}, [connectedWallet, contractAddress]);

	return {
		balanceOf,
	};
};

export default useBalanceOfERC721;
