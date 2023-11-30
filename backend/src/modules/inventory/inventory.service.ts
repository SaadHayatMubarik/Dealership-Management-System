import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Inventory } from './entities/Inventory';
import { Repository } from 'typeorm';
import { InventoryDto } from './dto/inventory.dto';
import { InventoryStatus } from './inventory-status.enum';
import { Inventory } from './entity/Inventory';

@Injectable()
export class InventoryService {

    constructor (
        @InjectRepository(Inventory)
        private inventoryRepository: Repository<Inventory>,
        
    ){}

    async addInventory (addInventoryDto: InventoryDto): Promise<Inventory>{
        const inventory = new Inventory();
        const { vehicleMake, vehicleModel , vehicleVariant , modelYear , vehicleChasisNo , costPrice , demand , dateOfPurchase , dateOfSale , bodyColor , engineNo , comments , grade , regNo, status } = addInventoryDto;
        inventory.make = vehicleMake.toUpperCase();
        inventory.model = vehicleModel.toUpperCase();
        inventory.variant = vehicleVariant.toUpperCase();
        inventory.year = modelYear;
        inventory.chasis_no = vehicleChasisNo.toUpperCase();
        inventory.price = costPrice;
        inventory.demand = demand;
        inventory.date_of_purchase = dateOfPurchase;
        inventory.date_of_sale = dateOfSale;
        inventory.color = bodyColor.toUpperCase();
        inventory.engine_no = engineNo.toUpperCase();
        inventory.comments = comments.toUpperCase();
        inventory.grade = grade;
        inventory.status = status;
        inventory.reg_no = regNo.toUpperCase();
        // console.log(inventory);
        // if (status.toUpperCase() === InventoryStatus.ON_ORDER){
        //     inventory.status = InventoryStatus.ON_ORDER;
        // }
        // else if (status.toUpperCase() === InventoryStatus.SOLD){
        //     inventory.status = InventoryStatus.SOLD;
        // }
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
