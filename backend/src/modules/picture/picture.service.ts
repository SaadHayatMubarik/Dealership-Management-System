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
  
  // AWS_S3_BUCKET = 'd-m-s';
  // s3 = new AWS.S3({
  //   accessKeyId: 'AKIAZI2LGWUFHKKODIOG',
  //   secretAccessKey: '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',
  // });

    constructor(
      private readonly s3Service: S3Service,
        @InjectRepository(Picture)
        private readonly pictureRepository: Repository<Picture>,
      ) {}
      
      async uploadImage(
        file: Express.Multer.File[],
        type: string,
        inventoryObj: Inventory
        // userStorageDto: UserStorageDto,
        // user: UserDetails,
      ): Promise<string> {
        // const { type } = userStorageDto;
    
        // const found: Inventory = await this.userModel.findById(user.id);
        // if (!found) throw new NotFoundException('User not found');
    
        const path = type;
        for (let i=0; i < file.length; i++) {
        const picture = new Picture();
        const newImage = await this.s3Service.upload(path, file[i]);
        picture.link = newImage;
        picture.inventory = inventoryObj;
        await this.pictureRepository.save(picture);
        
        }
        return "uploaded successfully";
        // found.set({ [type]: newImage });
        // await found.save();
    
        // if (deleteKey) {
        //   await this.s3Service.deleteOne(${path}/${deleteKey});
        // }
    
        // if (type === UserStorage.AVATAR) {
        //   const { id: userId, avatar, version } = found;
        //   const event: AccountUpdatedEvent = { userId, avatar, version };
        //   this.publisher.emit<void, AccountUpdatedEvent>(
        //     Subjects.AccountUpdated,
        //     event,
        //   );
        // }
        
      }

      
    // async uploadPictureToS3(file: Express.Multer.File): Promise<string> {
    //     const s3 = new S3();
    //     const params = {
    //       Bucket: this.AWS_S3_BUCKET,
    //       Key: file.originalname,
    //       Body: file.buffer,
    //       ContentType: file.mimetype,
    //     };
    //     try {
    //       const uploadedObject = await s3.upload(params).promise();
    //     return uploadedObject.Location;
    //     } catch (e) {
    //       console.log(e);
    //     }
        
    //   }
    
    //   async savePictureUrlToDatabase(file: Express.Multer.File, inventoryObj: Inventory): Promise<Picture> {
    //     const url = await this.uploadPictureToS3(file);   // saving the file in aws and getting the url 
    //     const picture = new Picture();
    //     picture.link = url;
    //     picture.inventory = inventoryObj;
    //     return this.pictureRepository.save(picture);
    //   }
}
