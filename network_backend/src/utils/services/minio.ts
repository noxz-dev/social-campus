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
  minioClient.bucketExists('profile-pics', async (err, exists) => {
    if (err) {
      log.error(err.stack);
    }
    if (!exists) {
      minioClient.makeBucket('profile-pics', 'eu', async (err) => {
        if (err) log.error(err.stack);
        console.log('Bucket created successfully');

        const policy = await readFile(__dirname + '/../../../config/fetchonly_profilepic.json', 'utf8');
        minioClient.setBucketPolicy('profile-pics', policy, (err) => {
          if (err) throw err;
          log.info('s3 bucket policy set');
        });
      });
    }
  });

  minioClient.bucketExists('post-images', async (err, exists) => {
    if (err) {
      log.error(err.stack);
    }
    if (!exists) {
      minioClient.makeBucket('post-images', 'eu', async (err) => {
        if (err) log.error(err.stack);
        console.log('Bucket created successfully');

        const policy = await readFile(__dirname + '/../../../config/fetchonly_postImages.json', 'utf8');
        minioClient.setBucketPolicy('post-images', policy, (err) => {
          if (err) throw err;
          log.info('s3 bucket policy set');
        });
      });
    }
  });
};
