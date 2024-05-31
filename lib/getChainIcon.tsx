import {
	optimism,
	optimismSepolia,
	baseSepolia,
	base,
	sepolia,
	mainnet,
	polygon,
	polygonMumbai,
} from 'viem/chains';
import ethereumIcon from '../public/icons/Ethereum.svg';
import optimismIcon from '../public/icons/Optimism.svg';
import baseIcon from '../public/icons/Base.svg';
import polygonIcon from '../public/icons/Polygon.svg';

const getChainIcon = (chainId: number) => {
	switch (chainId) {
		case base.id:
		case baseSepolia.id:
			return baseIcon;
		case optimism.id:
		case optimismSepolia.id:
			return optimismIcon;
		case mainnet.id:
		case sepolia.id:
			return ethereumIcon;
		case polygon.id:
		case polygonMumbai.id:
			return polygonIcon;
		default:
			return ethereumIcon;
	}
};

export default getChainIcon;
