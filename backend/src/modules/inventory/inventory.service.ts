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
        const { make, model , variant , year , chasisNo , price , demand , dateOfPurchase , dateOfSale , color , engineNo , comments , grade , regNo, status } = addInventoryDto;
        // console.log(addInventoryDto.dateOfPurchase);
        inventory.make = make.toUpperCase();
        inventory.model = model.toUpperCase();
        inventory.variant = variant.toUpperCase();
        inventory.year = year;
        inventory.chasis_no = chasisNo.toUpperCase();
        inventory.price = price;
        inventory.demand = demand;
        inventory.date_of_purchase = dateOfPurchase;
        inventory.date_sold = dateOfSale;
        inventory.color = color.toUpperCase();
        inventory.engine_no = engineNo.toUpperCase();
        inventory.comments = comments.toUpperCase();
        inventory.grade = grade;
        inventory.status = InventoryStatus.UNSOLD;
        inventory.reg_no = regNo.toUpperCase();
        // console.log(inventory);
        if (status.toUpperCase() === InventoryStatus.ON_ORDER){
            inventory.status = InventoryStatus.ON_ORDER;
        }
        else if (status.toUpperCase() === InventoryStatus.SOLD){
            inventory.status = InventoryStatus.SOLD;
        }
        await this.inventoryRepository.save(inventory);
        return inventory;
    }

    async getInventory(): Promise<Inventory[]>{
        return await this.inventoryRepository.find();
    }

    deleteInventory(inventoryId: number){
        return this.inventoryRepository.delete({ inventory_id: inventoryId });
    }
    
}
