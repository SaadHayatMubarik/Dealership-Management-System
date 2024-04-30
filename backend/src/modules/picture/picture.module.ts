import { Module } from '@nestjs/common';
// import { PictureService } from './picture.service';
import { PictureController } from './picture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from './entity/Picture';
import { PictureService } from './picture.service';
import { S3Service } from './aws-s3.service';
import { ConfigService } from '@nestjs/config';
import { Inventory } from '../inventory/entity/Inventory';
// import { S3Service } from './aws-s3.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Picture,Inventory])
  ],
  providers: [PictureService, S3Service,ConfigService],
  controllers: [PictureController]
})
export class PictureModule {}
