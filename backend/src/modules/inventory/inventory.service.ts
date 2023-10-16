import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './Inventory';
import { Repository } from 'typeorm';
import { AddInventoryDto } from './add-inventory.dto';
import { InventoryStatus } from './inventory-status.enum';

@Injectable()
export class InventoryService {

    constructor (
        @InjectRepository(Inventory)
        private inventoryRepository: Repository<Inventory>,
        
    ){}

    async addInventory (addInventoryDto: AddInventoryDto): Promise<Inventory>{
        const inventory = new Inventory();
        const { make, model , variant , year , chasisNo , price , demand , dateOfPurchase , color , engineNo , comments , grade , regNo } = addInventoryDto;
        console.log(addInventoryDto.dateOfPurchase);
        inventory.make = make;
        inventory.model = model;
        inventory.variant = variant;
        inventory.year = year;
        inventory.chasis_no = chasisNo;
        inventory.price = price;
        inventory.demand = demand;
        inventory.date_of_purchase = dateOfPurchase;
        inventory.color = color;
        inventory.engine_no = engineNo;
        inventory.comments = comments;
        inventory.grade = grade;
        inventory.status = InventoryStatus.UNSOLD;
        inventory.reg_no = regNo;
        console.log(inventory);
        await this.inventoryRepository.save(inventory);
        return inventory;
    }

    
}
