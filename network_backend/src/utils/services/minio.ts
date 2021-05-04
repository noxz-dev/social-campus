import { readFile } from 'fs/promises';
import * as Minio from 'minio';
import { log } from './logger';

export const minioClient = new Minio.Client({
  endPoint: 'minio',
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

export const initS3 = async (): Promise<void> => {
  minioClient.bucketExists('images', async (err, exists) => {
    if (err) {
      log.error(err.stack);
      return;
    }
    if (!exists) {
      minioClient.makeBucket('images', 'eu', async (err) => {
        if (err) log.error(err.stack);
        log.info('✔ Bucket created successfully');

        const policy = await readFile(__dirname + '/../../../config/fetchonly_images.json', 'utf8');
        minioClient.setBucketPolicy('images', policy, (err) => {
          if (err) throw err;
          log.info('✔ bucket s3 bucket policy set');
        });
      });
    } else {
      log.info('bucket already exisits');
    }
  });
};
