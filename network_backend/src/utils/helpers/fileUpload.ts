import { encode } from 'blurhash';
import { createWriteStream, promises as fsPromisses, unlink, writeFileSync } from 'fs';
import { FileUpload } from 'graphql-upload';
import os from 'os';
import path from 'path';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { log } from '../services/logger';
import { minioClient } from '../services/minio';

interface UploadResponse {
  filename: string;
  blurhash: string;
}

/**
 * File Upload for file that are coming from the GraphQL-API
 * @param file file to be uploaded
 * @param bucketName s3 bucketname
 * @returns UploadResponse
 */
export const uploadFileGraphql = async (file: FileUpload, bucketName: string): Promise<UploadResponse> => {
  const metaData = {
    'Content-Type': 'application/octet-stream',
    'X-Amz-Meta-Testing': 1234,
    example: 5678,
  };
  const filenameUUID = uuidv4();
  const { createReadStream, filename } = await file;

  const fileEnding = filename.split('.')[1];
  const newFileName = filenameUUID + '.' + fileEnding;

  const destinationPath = path.join(os.tmpdir(), filename);
  let blurhash: string;

  const uploadFileName = await new Promise<string>((res, rej) =>
    createReadStream()
      .pipe(createWriteStream(destinationPath))
      .on('error', rej)
      .on('finish', async () => {
        //generate a blurhash for previews, only if the file is an image
        try {
          if (!['pdf'].includes(fileEnding)) blurhash = await generateBlurhash(destinationPath);
        } catch (err) {
          log.error('blurhash couldnt be generated');
        }
        let path = destinationPath;
        let filename = newFileName;

        //compress images and ignore pdf files or gif
        if (!path.toLowerCase().endsWith('.pdf') && !path.toLowerCase().endsWith('.gif')) {
          path = await compressImage(destinationPath);
          filename = newFileName.split('.')[0] + '.jpg';
        }

        // upload file to s3
        minioClient.fPutObject(bucketName, filename, path, metaData, async (err, etag) => {
          if (err) {
            log.error(err.stack);
            throw Error('image upload failed');
          }
          log.info('File uploaded successfully.');

          //Delete the tmp file uploaded
          await fsPromisses.unlink(destinationPath);
          await fsPromisses.unlink(path);
          res(filename);
        });
      }),
  );

  return { filename: uploadFileName, blurhash };
};

/**
 * File Upload from the Backend
 * @param file file to be uploaded
 * @param bucketName s3 bucketname
 * @returns UploadResponse
 */
export const uploadFile = async (file: Buffer, bucketName: string): Promise<UploadResponse> => {
  const metaData = {
    'Content-Type': 'application/octet-stream',
    'X-Amz-Meta-Testing': 1234,
    example: 5678,
  };
  const filenameUUID = uuidv4();

  const fileEnding = 'png';
  const newFileName = filenameUUID + '.' + fileEnding;
  const destinationPath = path.join(os.tmpdir(), newFileName);
  writeFileSync(destinationPath, file);

  let blurhash;

  //generate a blurhash for an image
  try {
    if (!['pdf'].includes(fileEnding)) blurhash = await generateBlurhash(destinationPath);
  } catch (err) {
    log.error('blurhash couldnt be generated');
  }

  //upload file to s3
  minioClient.fPutObject(bucketName, newFileName, destinationPath, metaData, (err, etag) => {
    if (err) {
      log.error(err.stack);
      throw Error('image upload failed');
    }
    log.info('File uploaded successfully.');
    unlink(destinationPath, () => {
      log.debug('file upload complete');
    });
  });

  return { filename: newFileName, blurhash };
};

/**
 * Generate a Blurhash for an image
 * @param path file path to the image
 * @returns blurhash
 */
const generateBlurhash = async (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    sharp(path)
      .raw()
      .ensureAlpha()
      .resize(32, 32, { fit: 'inside' })
      .toBuffer((err, buffer, { width, height }) => {
        if (err) return reject(err);
        resolve(encode(new Uint8ClampedArray(buffer), width, height, 4, 4));
      });
  });
};

/**
 * Compress an Image, to reduce the filesize
 * @param path file path to the image
 * @returns filepath where the compressed image got saved
 */
const compressImage = async (imagePath: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const newPath = path.join(os.tmpdir(), uuidv4() + '.jpg');
      console.log(newPath);
      await sharp(imagePath).jpeg({ mozjpeg: true, quality: 70 }).toFile(newPath);
      resolve(newPath);
    } catch (err) {
      console.log(err);
      reject();
    }
  });
};
