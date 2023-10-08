import { Injectable } from '@nestjs/common';
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
        const { make, model , variant , year , chasis_no , price , demand , date_of_purchase , color , engine_no , comments , grade } = addInventoryDto;
        inventory.make = make;
        inventory.model = model;
        inventory.variant = variant;
        inventory.year = year;
        inventory.chasis_no = chasis_no;
        inventory.price = price;
        inventory.demand = demand;
        inventory.date_of_purchase = date_of_purchase;
        inventory.color = color;
        inventory.engine_no = engine_no;
        inventory.comments = comments;
        inventory.grade = grade;
        inventory.status = InventoryStatus.UNDEFINED;
        await this.inventoryRepository.save(inventory);
        return inventory;
    }

    
}
