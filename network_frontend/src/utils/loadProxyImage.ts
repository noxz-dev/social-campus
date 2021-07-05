import axios from 'axios';
import { Buffer } from 'buffer';

//create an image cache to hold allready loaded images
const imageCache = new Map();

/**
 * loads a image from the file proxy
 * @param filename filename of the image
 * @returns srcUrl
 */
export const loadProxyImage = async (filename: string): Promise<string> => {
  if (imageCache.has(filename)) {
    return 'data:' + 'image/jpeg' + ';base64,' + imageCache.get(filename);
  }
  try {
    const response = await axios({
      url: `/api/files/${filename}`,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('apollo-token'),
      },
      method: 'GET',
      responseType: 'arraybuffer',
    });
    const b64encoded = Buffer.from(response.data, 'base64');
    const srcUrl = 'data:' + 'image/jpeg' + ';base64,' + b64encoded;
    imageCache.set(filename, b64encoded);
    return srcUrl;
  } catch (err) {
    console.log('could not load the image via the proxy');
    throw Error('whoops, that shouldnt happen');
  }
};

/**
 * loads a file from the file proxy
 * @param filename filename of the file
 * @returns srcUrl
 */
export const loadProxyFile = async (filename: string): Promise<string> => {
  try {
    const response = await axios({
      url: `/api/files/${filename}`,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('apollo-token'),
      },
      method: 'GET',
      responseType: 'arraybuffer',
    });
    const b64encoded = Buffer.from(response.data, 'base64');
    const src = 'data:application/octet-stream;base64,' + b64encoded;
    return src;
  } catch (err) {
    console.log('could not load the file via the proxy');
    throw Error('whoops, that shouldnt happen');
  }
};
