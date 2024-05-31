import { useState } from 'react';
import WhitelistMintButton from './WhitelistMintButton';
import Quantity from './Quantity';
import MintButton from './MintButton';
import useZoraPurchasePresale from '@/hooks/useZoraPurchasePresale';
import useWhitelist from '@/hooks/useWhitelist';

const MintSection = () => {
	const { totalSupply } = useZoraPurchasePresale();
	const [quantity, setQuantity] = useState(1);
	const { isWhitelisted } = useWhitelist();

	return (
		<div className="space-y-6">
			<Quantity
				quantity={quantity}
				setQuantity={setQuantity}
				totalSupply={totalSupply}
			/>
			{isWhitelisted ? (
				<WhitelistMintButton quantity={quantity} />
			) : (
				<MintButton quantity={quantity} />
			)}
		</div>
	);
};

export default MintSection;
