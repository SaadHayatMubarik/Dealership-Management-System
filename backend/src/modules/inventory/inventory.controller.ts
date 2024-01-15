import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { InventoryService } from './inventory.service';
// import { Inventory } from './entities/Inventory';
import { InventoryDto } from './dto/inventory.dto';
// import { VehicleType } from '../vehicle-type/entities/Vehicle-type';
import { deepStrictEqual } from 'assert';
import { Inventory } from './entity/Inventory';
import { GetInventroyDto } from './dto/getInventory.dto';
import { GetInventoryByFilterDto } from './dto/getInventoryByFilter.dto';

@Controller('inventory')
export class InventoryController {
    constructor(private inventoryService: InventoryService){}

    @Post('addInventory')
    addInventory(@Body() addInventoryDto: InventoryDto): Promise<Inventory> {
        console.log(addInventoryDto);
        return this.inventoryService.addInventory(addInventoryDto)
    }
    @Get('getInventoryDetails/:inventoryID')
    getInventoryDetail(@Param('inventoryId') inventoryId: number): Promise<Inventory>{
        return this.inventoryService.getInventoryDetails(inventoryId);
    }

    @Get('getInventory/:showroomId/:status')
    getInventory(@Param('showroomId') showroomId: number,@Param('status') status: String): Promise<GetInventroyDto[]>{
        // console.log(status,showroomId); 
        return this.inventoryService.getInventory(status, showroomId);
    }

    @Get('getMarketInventory')
    getMarketInventory(@Body() getInventoryByFilterDto: GetInventoryByFilterDto): Promise <GetInventroyDto[]>{
        return this.inventoryService.getMarketInventory(getInventoryByFilterDto);
    }

    @Delete('/:inventoryId')
    @UsePipes(new ValidationPipe())
    deleteInventory(@Param('inventoryId') inventoryId: number):void{
        this.inventoryService.deleteInventory(inventoryId);
    }
}
