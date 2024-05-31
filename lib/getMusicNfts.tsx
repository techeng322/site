import {
	mainnet,
	optimism,
	optimismSepolia,
	sepolia,
	polygon,
	polygonMumbai,
} from 'viem/chains';
import { CHAIN_ID, IS_TESTNET } from './consts';
import getFormattedMusicNfts from './getFormattedMusicNfts';
import getNFTs from './alchemy/getNFTs';

const getMusicNfts = async (address: string) => {
	const [baseNfts, opNfts, nfts, polygonNfts] = await Promise.all([
		getNFTs(address, '', CHAIN_ID),
		getNFTs(address, '', IS_TESTNET ? optimismSepolia.id : optimism.id),
		getNFTs(address, '', IS_TESTNET ? sepolia.id : mainnet.id),
		getNFTs(address, '', IS_TESTNET ? polygonMumbai.id : polygon.id),
	]);

	const addChainId = (nftArray: any, chainId: number) =>
		nftArray.map((nft: any) => ({ ...nft, chainId }));

	const combinedNFTs = [
		...addChainId(baseNfts.ownedNfts, CHAIN_ID),
		...addChainId(
			opNfts.ownedNfts,
			IS_TESTNET ? optimismSepolia.id : optimism.id
		),
		...addChainId(nfts.ownedNfts, IS_TESTNET ? sepolia.id : mainnet.id),
		...addChainId(
			polygonNfts.ownedNfts,
			IS_TESTNET ? polygonMumbai.id : polygon.id
		),
	];

	const filteredNFTs = combinedNFTs.filter((nft: any) => {
		const metadata = nft?.raw?.metadata;
		const isSound = metadata?.losslessAudio;
		const isZora = metadata?.content?.mime?.includes?.('audio');
		const isMp3AnimationUrl = metadata?.animation_url?.endsWith('mp3');
		return metadata && (isSound || isZora || isMp3AnimationUrl);
	});

	const mapped = getFormattedMusicNfts(filteredNFTs);
	return mapped;
};

export default getMusicNfts;
