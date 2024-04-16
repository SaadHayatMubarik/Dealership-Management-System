import { createHash, randomBytes } from 'crypto';
import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private s3: S3Client;
  private readonly bucketName: string;

  constructor() {
    // initializing s3 client
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: 'AKIAZI2LGWUFHKKODIOG',
        secretAccessKey:
          '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',
      },
      region: 'ap-southeast-2',
    });

    this.bucketName = 'd-m-s';
  }

  // delete single file from cloud
  async deleteOne(key: string): Promise<void> {
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      }),
    );
  }

  // upload file to cloud
  async upload(path: string, file: Express.Multer.File): Promise<string> {
    const fileName = file.originalname;
    const body = file.buffer;

    // hash filename
    const iv = randomBytes(16);
    const dataToHash = fileName + iv.toString('hex');
    const key = createHash('sha256').update(dataToHash).digest('hex');

    const pathKey = `${path}/${key}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: pathKey,
        Body: body,
        ContentDisposition: `attachment; filename="${fileName}"`,
        ContentType: file.mimetype,
      }),
    );

    return key;
  }
}
