import { Controller, FileTypeValidator, Param, ParseFilePipe, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { PictureService } from './picture.service';
import { AuthGuard } from '@nestjs/passport';
import { MaxImageSizeValidator } from './max-image.validator';
import { Inventory } from '../inventory/entity/Inventory';

@Controller('picture')
export class PictureController {

    constructor(
        private pictureService: PictureService
    ){}
    // @Post('/:pictureType')
    // // @UseGuards(AuthGuard)
    // @UseInterceptors(FilesInterceptor('files', 10))
    // async createReview(
    //   @UploadedFiles(
    //     new ParseFilePipe({
    //       validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
    //       fileIsRequired: true,
    //     }),
    //     new MaxImageSizeValidator(),
    //   )
    //   files: Express.Multer.File[],
    //   @Param('pictureType') pictureType: string
    // //   @Body() data: ReviewDto,
    // ): Promise<string> {
    //   return this.pictureService.uploadImage(files,pictureType);
    // }

}
