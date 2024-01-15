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
import { GetInventroyDto } from './dto/getInventory.dto';
import { VehicleType } from '../vehicle-type/entity/Vehicle-type';
import { GetInventoryByFilterDto } from './dto/getInventoryByFilter.dto';

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
        const { vehicleType, vehicleMake, vehicleModel , vehicleVariant , modelYear , vehicleChasisNo , costPrice , demand , dateOfPurchase , dateOfSale , bodyColor , engineNo , comments , grade , regNo, mileage, status, showroomId, value, attributeValueId } = addInventoryDto;
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
        inventory.mileage = mileage;
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

    async getInventory(status: String, showroomId: number): Promise<GetInventroyDto[]>{
        // let vehicleStatus = status.toUpperCase();
        const getData = this.inventoryRepository.createQueryBuilder('inventory')
        // .leftJoin(VehicleType,'vehicleType', 'inventory.vehicleVehicleTypeId = vehicleType.type_id')
        .select(['inventory_id as inventoryId','make as vehicleMake','model as vehicleModel', 'variant as vehicleVariant', 'year as modelYear','chasis_no as vehicleChasisNo','demand', 'mileage'])
        .where('inventory.status = :status',{status})
        .where('inventory.showroomShowroomId = :showroomId',{showroomId});
        const result = await getData.getRawMany();
        return result;
    }

    async getInventoryDetails(inventoryID: number): Promise<Inventory>{
        return await this.inventoryRepository.findOne({where: {inventory_id: inventoryID}});
    }

    async getMarketInventory(getInventoryByFilterDto: GetInventoryByFilterDto): Promise<GetInventroyDto[]>{
        const { filterBy, Keyword, showroomId } = getInventoryByFilterDto;
        const getData = this.inventoryRepository.createQueryBuilder('inventory')
        .select(['inventory_id as  inventoryId','make as vehicleMake','model as vehicleModel', 'variant as vehicleVariant', 'year as modelYear','demand', 'mileage'])
        .where(`inventory.${filterBy} = :keyword`, {Keyword})
        .andWhere('inventory.showroomShowroomId != :showroomId',{showroomId});
        const result = await getData.getRawMany();
        return result;
    }

    deleteInventory(inventoryId: number){
        return this.inventoryRepository.delete({ inventory_id: inventoryId });
    }
    
}
