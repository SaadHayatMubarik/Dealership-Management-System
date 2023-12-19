import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { InventoryService } from './inventory.service';
// import { Inventory } from './entities/Inventory';
import { InventoryDto } from './dto/inventory.dto';
// import { VehicleType } from '../vehicle-type/entities/Vehicle-type';
import { deepStrictEqual } from 'assert';
import { Inventory } from './entity/Inventory';
import { GetInventroyDto } from './dto/getInventory.dto';

@Controller('inventory')
export class InventoryController {
    constructor(private invenotryService: InventoryService){}

    @Post('addInventory')
    addInventory(@Body() addInventoryDto: InventoryDto): Promise<Inventory> {
        console.log(addInventoryDto);
        return this.invenotryService.addInventory(addInventoryDto)
    }

    @Get('getInventory/:showroomId/:status')
    getInventory(@Param('showroomId') showroomId: number,@Param('status') status: String): Promise<GetInventroyDto[]>{
        console.log(status,showroomId); 
        return this.invenotryService.getInventory(status, showroomId);
    }

    @Delete('/:inventoryId')
    @UsePipes(new ValidationPipe())
    deleteInventory(@Param('inventoryId') inventoryId: number):void{
        this.invenotryService.deleteInventory(inventoryId);
    }
}
