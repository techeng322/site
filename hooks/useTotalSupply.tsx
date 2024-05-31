import { useEffect, useState } from 'react';
import { Address } from 'viem';
import getTotalSupply from '@/lib/getTotalSupply';

const useTotalSupply = (contractAddress: Address) => {
	const [totalSupply, setTotalSupply] = useState('0');

	useEffect(() => {
		const init = async () => {
			const response = await getTotalSupply(contractAddress);
			setTotalSupply((response as any).toString());
		};
		init();
	}, [contractAddress]);

	return { totalSupply };
};

export default useTotalSupply;
