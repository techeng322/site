import axios from 'axios';

export default async function handler(req: any, res: any) {
	const { metadataUri } = req.query;
	const response = await axios.get(metadataUri);

	res.status(200).json(response.data);
}
