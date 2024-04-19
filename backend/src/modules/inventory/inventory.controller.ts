import { Body, Controller, Delete, FileTypeValidator, Get, Param, ParseFilePipe, Post, Put, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryDto } from './dto/inventory.dto';
import { Inventory } from './entity/Inventory';
import { GetInventroyDto } from './dto/getInventory.dto';
import { GetInventoryByFilterDto } from './dto/getInventoryByFilter.dto';
import { AuthGuard } from '@nestjs/passport';
import { InventoryStatus } from './inventory-status.enum';
import { UpdateInventoryDto } from './dto/updateInventory.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Picture } from '../picture/entity/Picture';
import { MaxImageSizeValidator } from '../picture/max-image.validator';


@Controller('inventory')
// @UseGuards(AuthGuard())
export class InventoryController {
    constructor(private inventoryService: InventoryService){}

    @Post('addInventory/:pictureType')
    
    addInventory(
    @UploadedFiles(
        new ParseFilePipe({
          validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
          fileIsRequired: true,
        }),
        new MaxImageSizeValidator(),
      )
      files: Express.Multer.File[],
      pictures: Express.Multer.File[],
      @Param('pictureType') pictureType: string,
      @Body() addInventoryDto: InventoryDto): Promise<Inventory> {
        // console.log(addInventoryDto);
        return this.inventoryService.addInventory(files,pictures,pictureType,addInventoryDto);
    }

    @Get('getInventoryDetails/:inventoryId')
    getInventoryDetail(@Param('inventoryId') inventoryId: number): Promise<Inventory>{
        // console.log("inventoryId: " + inventoryId);
        return this.inventoryService.getInventoryDetails(inventoryId);
    }

    @Get('getInventory/:showroomId/:status')
    getInventory(@Param('showroomId') showroomId: number,@Param('status') status: String): Promise<GetInventroyDto[]>{
        // console.log(status,showroomId); 
        return this.inventoryService.getInventory(status, showroomId);
    }

    @Get('getMarketInventory/:showroomId/:status')
    getMarketInventory(@Param('showroomId') showroomId:number, @Param('status') status: InventoryStatus): Promise <GetInventroyDto[]>{
        // console.log(getInventoryByFilterDto);
        // console.log(showroomId,status)
        return this.inventoryService.getMarketInventory(showroomId, status);
    }

    @Delete('/:inventoryId')
    @UsePipes(new ValidationPipe())
    deleteInventory(@Param('inventoryId') inventoryId: number){
        return this.inventoryService.deleteInventory(inventoryId);
    }

    @Put('updateInventory/sellInventory')
    updateInventory(@Body() updateInventoryDto: UpdateInventoryDto): Promise<Inventory>{
        // console.log(updateInventoryDto);
        return this.inventoryService.updateInventory(updateInventoryDto);
    }

    // @Post('uploadPicture')
    // @UseInterceptors(FileInterceptor('file'))
    // uploadFile(@UploadedFiles() file: Express.Multer.File): Promise<Picture> {
    //     console.log(file);
    //   return this.inventoryService.savePictureUrlToDatabase(file,inventoryObj);
    // }

    @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() inventoryObj: Inventory) {
    return this.inventoryService.uploadFile(file);
  }

  @Get('dashboard/TotalInventory/:showroomId')
  getTotalAvailableInventory(@Param('showroomId') showroomId: number): Promise<number>{
    return this.inventoryService.getTotalAvailableInventory(showroomId);
  }
}
