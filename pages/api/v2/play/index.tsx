import axios from 'axios';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

export const config = {
  api: {
    responseLimit: false,
  },
}
export default async function handler(req: any, res: any) {
  const { trackUrl } = req.query;

  try {
    const response = await axios.get(trackUrl, { responseType: 'stream' });

    // Set appropriate headers for the response
    res.setHeader('Content-Type', response.headers['content-type']);
    res.setHeader('Content-Length', response.headers['content-length']);

    // Stream the data from the axios response to the response object
    await pipelineAsync(response.data, res);
  } catch (error) {
    res.status(500).end('Internal Server Error');
  }
}
