import { createWriteStream, unlink, writeFileSync } from 'fs';
import { FileUpload } from 'graphql-upload';
import { MozJPEG, PNGQuant } from 'image-stream-compress';
import os from 'os';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { log } from '../services/logger';
import { minioClient } from '../services/minio';
export const uploadFileGraphql = async (file: FileUpload, bucketName: string): Promise<string> => {
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
  let compress;
  if (fileEnding === 'png') {
    compress = new PNGQuant([256, '--speed', 5, '--quality', '65-80']);
  } else if (['jpg', 'jpeg', 'JPG', 'JPEG'].includes(fileEnding)) {
    compress = new MozJPEG();
  }

  if (compress) {
    await new Promise((res, rej) =>
      createReadStream()
        .pipe(compress)
        .pipe(createWriteStream(destinationPath))
        .on('error', rej)
        .on('finish', () => {
          minioClient.fPutObject(bucketName, newFileName, destinationPath, metaData, (err, etag) => {
            if (err) {
              log.error(err.stack);
              throw Error('image upload failed');
            }
            log.info('File uploaded successfully.');

            //Delete the tmp file uploaded
            unlink(destinationPath, () => {
              res('file upload complete');
            });
          });
        }),
    );
  } else {
    await new Promise((res, rej) =>
      createReadStream()
        .pipe(createWriteStream(destinationPath))
        .on('error', rej)
        .on('finish', () => {
          minioClient.fPutObject(bucketName, newFileName, destinationPath, metaData, (err, etag) => {
            if (err) {
              log.error(err.stack);
              throw Error('image upload failed');
            }
            log.info('File uploaded successfully.');

            //Delete the tmp file uploaded
            unlink(destinationPath, () => {
              res('file upload complete');
            });
          });
        }),
    );
  }

  return newFileName;
};

export const uploadFile = async (file: Buffer, bucketName: string): Promise<string> => {
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
  return newFileName;
};
