const getFormattedMusicNfts = (rawData: any) =>
	rawData.map((nft: any) => ({
		src: nft?.tokenUri,
		meta: {
			name: nft?.name,
			artist: nft?.raw?.metadata?.artist || '',
			duration: String(nft?.raw?.metadata?.duration),
			cover: nft?.image?.pngUrl,
			animationUrl:
				nft?.raw?.metadata?.animation_url || nft?.raw?.metadata?.losslessAudio,
		},
		token: {
			id: parseInt(nft?.tokenId, 10).toString(),
			contractAddress: nft?.contract?.address,
			chainId: nft?.chainId,
			type: nft?.tokenType,
		},
	}));

export default getFormattedMusicNfts;
