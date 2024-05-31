import handleTxError from '@/lib/handleTxError';
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
    res.setHeader('Content-Type', response.headers['content-type']);
    res.setHeader('Content-Length', response.headers['content-length']);
    await pipelineAsync(response.data, res);
  } catch (error: any) {
    throw Error(error)
  }
}
