import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Inventory } from './entities/Inventory';
import { Repository } from 'typeorm';
import { InventoryDto } from './dto/inventory.dto';
import { InventoryStatus } from './inventory-status.enum';
import { Inventory } from './entity/Inventory';
import { Showroom } from '../showroom/entity/Showroom';
import { StockAttributeValue } from '../stock-attribute-value/entity/Stock-attribute-value';
import { MulterModule } from '@nestjs/platform-express';
import { MultiValueAttribute } from '../multi-value-attribute/entity/Multi-value-attribute';

@Injectable()
export class InventoryService {

    constructor (
        @InjectRepository(Inventory)
        private inventoryRepository: Repository<Inventory>,
        @InjectRepository(Showroom)
        private showroomRepository: Repository<Showroom>,
        @InjectRepository(MultiValueAttribute)
        private multiValueAttributeRepository : Repository <MultiValueAttribute> ,
        @InjectRepository(StockAttributeValue)
        private stockValueAttributeRepository: Repository <StockAttributeValue>
    ){}

    async addInventory (addInventoryDto: InventoryDto): Promise<Inventory>{
        const inventory = new Inventory();
        const { vehicleType, vehicleMake, vehicleModel , vehicleVariant , modelYear , vehicleChasisNo , costPrice , demand , dateOfPurchase , dateOfSale , bodyColor , engineNo , comments , grade , regNo, status, attributeValueId, value, showroomId } = addInventoryDto;
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
        inventory.vehicleType = vehicleType;
        inventory.showroom = await this.showroomRepository.findOne({ where: { showroom_id: showroomId } });
        // inventory.
        // console.log(inventory);
        await this.inventoryRepository.save(inventory);
        const Id = await this.inventoryRepository.getId(inventory);
        // console.log(Id);        
        // console.log("done");
        const count = await this.inventoryRepository.count({where:{ showroom:{ showroom_id:showroomId } }});
        for (let i=0; i<value.length; i++){
            const stockAttributeValue = new StockAttributeValue();
            stockAttributeValue.value = value[i];
            stockAttributeValue.multiValueAttribute = await this.multiValueAttributeRepository.findOne({ where: { multi_value_id: attributeValueId[i] } })
            stockAttributeValue.inventory = await this.inventoryRepository.findOne({where: { inventory_id:Id }});
            await this.stockValueAttributeRepository.save(stockAttributeValue);
        }
        return inventory;
    }

    async getInventory(): Promise<Inventory[]>{
        return await this.inventoryRepository.find();
    }

    deleteInventory(inventoryId: number){
        return this.inventoryRepository.delete({ inventory_id: inventoryId });
    }
    
}
