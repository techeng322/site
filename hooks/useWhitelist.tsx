import { Address } from 'viem';
import useConnectedWallet from './useConnectedWallet';
import usePrivyEthersSigner from './usePrivyEthersSigner';

const useWhitelist = () => {
	const { connectedWallet } = useConnectedWallet();
	const { signer } = usePrivyEthersSigner();
	const whitelist = [
		'0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38', // sweetman
		'0x7b753919B953b1021A33F55671716Dc13c1eAe08', // cxy
		'0xde13F752A3B12A8918FF84Bc048A50B73f5240A6', // truthpurity
		'0xfd72C716278894E9bc1Fda2d41F93c20A6CF91EC', // stephguerrero.eth
		'0x0e35B828026F010A291C1DC0939427b2963D8d5a', // Colomborkrdz.eth
		'0x089036a0835C6cF82e7fC42e9e95DfE05e110c81', // xcelencia.eth
		'0xD7d8CD5b871fED2BCD9CeA31cFAeEC93702C0498', // peacenode.eth
		'0x729F002B41E2Ea645ADEE9722Bd93E56B00847A3', // Colombo v2
	];
	const isWhitelisted =
		signer && whitelist.indexOf(connectedWallet as Address) > -1;

	return { isWhitelisted };
};

export default useWhitelist;
