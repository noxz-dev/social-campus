import axios from 'axios';
import { Buffer } from 'buffer';

export const loadProxyImage = async (filename: string): Promise<string> => {
  const response = await axios({
    url: `/api/files/${filename}`,
    method: 'GET',
    responseType: 'arraybuffer',
  });
  const b64encoded = Buffer.from(response.data, 'base64');
  const srcUrl = 'data:' + 'image/jpeg' + ';base64,' + b64encoded;
  return srcUrl;
};
