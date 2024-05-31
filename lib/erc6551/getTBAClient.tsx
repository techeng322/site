import { TokenboundClient } from '@tokenbound/sdk';
import { CHAIN_ID } from '../consts';

const getTBAClient = (signer: any, chainId: any = CHAIN_ID) => {
	return new TokenboundClient({ signer, chainId });
};

export default getTBAClient;
