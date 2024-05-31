import Image from 'next/image';
import getChainIcon from '@/lib/getChainIcon';

const ChainIcon = ({ chainId, className }: any) => (
	<Image className={className} alt="Chain logo" src={getChainIcon(chainId)} />
);

export default ChainIcon;
