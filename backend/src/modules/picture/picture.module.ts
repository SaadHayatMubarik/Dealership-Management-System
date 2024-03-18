import { Module } from '@nestjs/common';
import { PictureService } from './picture.service';
import { PictureController } from './picture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from './entity/Picture';

@Module({
  imports: [TypeOrmModule.forFeature([Picture])],
  providers: [PictureService],
  controllers: [PictureController]
})
export class PictureModule {}
