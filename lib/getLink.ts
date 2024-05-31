import getArweaveLink from './getArweaveLink';
import getIpfsLink from './getIpfsLink';

const getLink = (hash: string, gateway = 0) => {
	if (!hash) return hash;
	if (hash.includes('ipfs://')) {
		return getIpfsLink(hash, gateway);
	}
	return getArweaveLink(hash);
};

export default getLink;
