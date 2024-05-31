const getArweaveLink = (hash: string) =>
	hash?.indexOf?.('ar://') > -1
		? hash.replace('ar://', 'https://arweave.net/')
		: hash;

export default getArweaveLink;
