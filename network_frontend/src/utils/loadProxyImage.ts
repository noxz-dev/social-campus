import axios from 'axios';
import { Buffer } from 'buffer';

/**
 * loads a image from the file proxy
 * @param filename filename of the image 
 * @returns srcUrl 
 */
export const loadProxyImage = async (filename: string): Promise<string> => {
  const response = await axios({
    url: `/api/files/${filename}`,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem("apollo-token")
    },
    method: 'GET',
    responseType: 'arraybuffer',
  });
  const b64encoded = Buffer.from(response.data, 'base64');
  const srcUrl = 'data:' + 'image/jpeg' + ';base64,' + b64encoded;
  return srcUrl;
};

/**
 * loads a file from the file proxy
 * @param filename filename of the file
 * @returns srcUrl
 */
export const loadProxyFile = async (filename: string): Promise<string> => {
  const response = await axios({
    url: `/api/files/${filename}`,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem("apollo-token")
    },
    method: 'GET',
    responseType: 'arraybuffer',
  });
  const b64encoded = Buffer.from(response.data, 'base64');
  const src = 'data:application/octet-stream;base64,' + b64encoded;
  return src;
};