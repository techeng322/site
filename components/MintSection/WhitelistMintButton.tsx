import { useState } from 'react';
import toast from 'react-hot-toast';
import { formatEther } from 'viem';
import { BigNumber } from 'ethers';
import { useRouter } from 'next/router';
import { usePrivy } from '@privy-io/react-auth';
import { PRESALE_PRICE, ZORA_FEE } from '@/lib/consts';
import useZoraPurchasePresale from '@/hooks/useZoraPurchasePresale';
import useCanMint from '@/hooks/useCanMint';

const WhitelistMintButton = ({ quantity }: { quantity: number }) => {
	const { canMint } = useCanMint();
	const { login } = usePrivy();
	const { purchase } = useZoraPurchasePresale();
	const { push } = useRouter();
	const [minting, setMinting] = useState(false);
	const price = parseFloat(
		formatEther(BigNumber.from(PRESALE_PRICE).add(ZORA_FEE) as any)
	);
	const displayPrice = quantity * price;

	const handleSuccessRedirect = (tokenId?: string) => {
		setTimeout(() => {
			push(`/manage/${tokenId || ''}`);
			setMinting(false);
		}, 1500);
	};

	const handleSuccess = (toastId: any, receipt: any) => {
		toast('Purchased', {
			id: toastId,
		});
		const transferEvent = receipt.events[1];
		try {
			const tokenId = BigInt(transferEvent.topics[3]).toString();
			handleSuccessRedirect(tokenId);
			return;
		} catch (error) {
			console.error(error);
			handleSuccessRedirect('');
		}
	};

	const handleClick = async () => {
		if (!canMint) {
			login();
			return;
		}
		setMinting(true);
		const toastId = toast('Purchasing…');
		const receipt = await purchase(quantity);
		if (receipt) {
			handleSuccess(toastId, receipt);
			return;
		}
		toast('Error. Try again.', {
			id: toastId,
		});
		setMinting(false);
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className="block w-full bg-black text-white font-size-body py-4 px-6 rounded-xl"
		>
			{minting ? 'Minting...' : `Mint ${displayPrice.toFixed(4)} ETH`}
		</button>
	);
};

export default WhitelistMintButton;
