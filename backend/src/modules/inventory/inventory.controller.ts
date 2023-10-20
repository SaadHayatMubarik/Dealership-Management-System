import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory } from './Inventory';
import { AddInventoryDto } from './add-inventory.dto';
import { VehicleType } from '../vehicle-type/Vehicle-type';
import { deepStrictEqual } from 'assert';

@Controller('inventory')
export class InventoryController {
    constructor(private invenotryService: InventoryService){}

    @Post('addInventory')
    addInventory(@Body() addInventoryDto: AddInventoryDto): Promise<Inventory> {
        // console.log(addInventoryDto);
        return this.invenotryService.addInventory(addInventoryDto)
    }

    @Get('getInventory')
    getInventory(): Promise<Inventory[]>{
        return this.invenotryService.getInventory();
    }

    @Delete('/:inventoryId')
    @UsePipes(new ValidationPipe())
    deleteInventory(@Param('inventoryId') inventoryId: number):void{
        this.invenotryService.deleteInventory(inventoryId);
    }
}
