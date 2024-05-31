import axios from 'axios';

const getMetadata = async (tokenURI: string) => {
	try {
		const response = await axios.get('/api/v2/get/metadata', {
			params: {
				metadataUri: tokenURI,
			},
		});
		return response;
	} catch (err) {
		console.error(err);
		return { err };
	}
};

export default getMetadata;
