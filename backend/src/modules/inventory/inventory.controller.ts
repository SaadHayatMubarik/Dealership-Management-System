import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { InventoryService } from './inventory.service';
// import { Inventory } from './entities/Inventory';
import { InventoryDto } from './dto/inventory.dto';
// import { VehicleType } from '../vehicle-type/entities/Vehicle-type';
import { deepStrictEqual } from 'assert';
import { Inventory } from './entity/Inventory';
import { GetInventroyDto } from './dto/getInventory.dto';
import { GetInventoryByFilterDto } from './dto/getInventoryByFilter.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('inventory')
// @UseGuards(AuthGuard())
export class InventoryController {
    constructor(private inventoryService: InventoryService){}

    @Post('addInventory')
    addInventory(@Body() addInventoryDto: InventoryDto): Promise<Inventory> {
        console.log(addInventoryDto);
        return this.inventoryService.addInventory(addInventoryDto)
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

    @Get('getMarketInventory/:showroomId')
    getMarketInventory(@Param('showroomId') showroomId: number): Promise <GetInventroyDto[]>{
        return this.inventoryService.getMarketInventory(showroomId);
    }

    @Delete('/:inventoryId')
    @UsePipes(new ValidationPipe())
    deleteInventory(@Param('inventoryId') inventoryId: number):void{
        this.inventoryService.deleteInventory(inventoryId);
    }
}
