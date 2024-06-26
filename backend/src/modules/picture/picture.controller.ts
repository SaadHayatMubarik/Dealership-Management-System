import { Controller, FileTypeValidator, Get, Param, ParseFilePipe, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import {  FilesInterceptor } from '@nestjs/platform-express';
import { PictureService } from './picture.service';
import { AuthGuard } from '@nestjs/passport';
import { MaxImageSizeValidator } from './max-image.validator';
import { Inventory } from '../inventory/entity/Inventory';
import { Picture } from './entity/Picture';

@Controller('picture')
export class PictureController {

    constructor(
        private pictureService: PictureService
    ){}
    @Post('/:pictureType/:inventoryId')
    @UseInterceptors(FilesInterceptor('files', 10))
    async addPictures(
      @UploadedFiles(
        new ParseFilePipe({
          validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
          fileIsRequired: true,
        }), 
        new MaxImageSizeValidator(),
      )
      pictures: Express.Multer.File[],
      @Param('pictureType') pictureType: string,
      @Param('inventoryId') inventoryId: number
    ): Promise<Picture[]> {
      return this.pictureService.addPictures(pictures,pictureType,inventoryId);
    }

    @Get('getPicture/:inventoryId/:type')
    getPictures(@Param('inventoryId') inventoryId: number,@Param('type') type: string): Promise<Picture[]>{
      return this.pictureService.getPictures(inventoryId,type);
    }
}
