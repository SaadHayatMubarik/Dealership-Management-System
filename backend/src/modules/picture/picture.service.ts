import { Injectable } from '@nestjs/common';
import { Picture } from './entity/Picture';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { Inventory } from '../inventory/entity/Inventory';

@Injectable()
export class PictureService {

    constructor(
        @InjectRepository(Picture)
        private readonly pictureRepository: Repository<Picture>,
      ) {}

    async uploadPictureToS3(file: Express.Multer.File): Promise<string> {
        const s3 = new S3();
        const params = {
          Bucket: 'your-bucket-name',
          Key: file.originalname,
          Body: file.buffer,
          ContentType: file.mimetype,
        };
        try {
          const uploadedObject = await s3.upload(params).promise();
        return uploadedObject.Location;
        } catch (e) {
          console.log(e);
        }
        
      }
    
      async savePictureUrlToDatabase(file: Express.Multer.File, inventoryObj: Inventory): Promise<Picture> {
        const url = await this.uploadPictureToS3(file);   // saving the file in aws and getting the url 
        const picture = new Picture();
        picture.link = url;
        picture.inventory = inventoryObj;
        return this.pictureRepository.save(picture);
      }
}
