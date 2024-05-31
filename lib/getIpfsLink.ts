import { gateways } from './consts';

const getIpfsLink = (hash: string, gateway: number) => {
	return hash?.indexOf?.('ipfs://') > -1
		? hash.replace('ipfs://', `https://${gateways[gateway]}/ipfs/`)
		: hash;
};

export default getIpfsLink;
