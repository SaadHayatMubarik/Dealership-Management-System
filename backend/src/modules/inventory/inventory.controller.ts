import { Body, Controller, Post } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory } from './Inventory';
import { AddInventoryDto } from './add-inventory.dto';
import { VehicleType } from '../vehicle-type/Vehicle-type';

@Controller('inventory')
export class InventoryController {
    constructor(private invenotryService: InventoryService){}

    @Post('addInventory')
    addInventory(@Body() addInventoryDto: AddInventoryDto): Promise<Inventory> {
        console.log(addInventoryDto);
        return this.invenotryService.addInventory(addInventoryDto)
    }

    
}
