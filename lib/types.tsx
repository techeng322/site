export type Track = {
	src: string;
	meta: {
		name: string;
		artist: string;
		duration: string;
		cover: string;
		animationUrl: string;
	};
	token: {
		id: string;
		contractAddress: string;
		type: string;
		chainId?: number;
		editions?: number;
	};
};

export type Capsule = {
	address: string;
	capsuleId: number;
	meta: {
		name: string;
		tracks: Track[];
	};
	tokenId?: string;
};
