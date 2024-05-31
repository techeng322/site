import { base, baseGoerli, optimism, optimismGoerli } from 'viem/chains';

const BASE = '0x49048044D57e1C92A77f79988d21Fa8fAF74E97e';
const BASE_GOERLI = '0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA';
const OP = '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed';
const OP_GOERLI = '0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383';

const getOptimismPortalAddress = (chainId: number) => {
	switch (chainId) {
		case base.id:
			return BASE;
		case baseGoerli.id:
			return BASE_GOERLI;
		case optimism.id:
			return OP;
		case optimismGoerli.id:
			return OP_GOERLI;
		default:
			return false;
	}
};

export default getOptimismPortalAddress;
