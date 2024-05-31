import axios from 'axios';

export default async function handler(req: any, res: any) {
	const { trackUrl } = req.query;
	const response = await axios.get(trackUrl);

	res.status(200).json(response.data);
}
