import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Picture } from './entity/Picture';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import * as AWS from 'aws-sdk';
import { Inventory } from '../inventory/entity/Inventory';
import { S3Service } from './aws-s3.service';

@Injectable()
export class PictureService {
  

    constructor(
      private readonly s3Service: S3Service,
        @InjectRepository(Picture)
        private readonly pictureRepository: Repository<Picture>,
        @InjectRepository(Inventory)
        private readonly  inventoryRepository: Repository<Inventory>,
      ) {}
      
      async uploadImage(
        file: Express.Multer.File[],
        type: string,
        inventoryObj: Inventory
      ): Promise<Picture> {
        const path = type;
        for (let i=0; i < file.length; i++) {
        const picture = new Picture();
        const newImage = await this.s3Service.upload(path, file[i]);
        picture.link = newImage;
        picture.inventory = inventoryObj;
        return await this.pictureRepository.save(picture);
        
        }
        
      }

      async addPictures (pictures: Express.Multer.File[], pictureType: string, inventoryId: number): Promise <Picture>{   
        const inventoryObj = await this.inventoryRepository.findOneBy({inventory_id:inventoryId});  
        return await this.uploadImage(pictures,pictureType,inventoryObj);
      }

      async getPictures(): Promise<Picture>{
        return 
      }
}
