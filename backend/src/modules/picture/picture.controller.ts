import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PictureService } from './picture.service';

@Controller('picture')
export class PictureController {

    constructor(
        private pictureService: PictureService
    ){}

    // @Post('uploadPicture')
    // @UseInterceptors(FileInterceptor('file'))
    // uploadFile(@UploadedFile() file: Express.Multer.File) {
    //   return this.pictureService.savePictureUrlToDatabase(file);
    // }
}
