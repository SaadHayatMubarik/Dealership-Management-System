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
import { identity } from 'rxjs';
import { VehicleTypeAttribute } from '../vehicle-type-attribute/entity/Vehicle-type-attribute';
import { privateDecrypt } from 'crypto';

@Injectable()
export class InventoryService {

    constructor (
        @InjectRepository(Inventory)
        private inventoryRepository: Repository<Inventory>,
        @InjectRepository(Showroom)
        private showroomRepository: Repository<Showroom>,
        // @InjectRepository(MultiValueAttribute)
        // private multiValueAttributeRepository : Repository <MultiValueAttribute> ,
        @InjectRepository(VehicleType)
        private vehicleTypeRepository: Repository<VehicleType>,
        @InjectRepository(StockAttributeValue)
        private stockValueAttributeRepository: Repository <StockAttributeValue>,
        @InjectRepository(VehicleTypeAttribute)
        private vehicleTypeAttribute: Repository <VehicleTypeAttribute>
    ){}

    async addInventory (addInventoryDto: InventoryDto): Promise<Inventory>{
        const inventory = new Inventory();
        const { vehicleType, vehicleMake, vehicleModel , vehicleVariant , modelYear , vehicleChasisNo , costPrice , demand , dateOfPurchase , dateOfSale , bodyColor , engineNo , comments , grade , regNo, mileage, status, showroomId,stockAttributeValue } = addInventoryDto;
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

        // console.log('stockValueAttribute', stockAttributeValue);

        await this.inventoryRepository.save(inventory);

        const inventoryId = await this.inventoryRepository.getId(inventory);

        let inventoryObj = await this.inventoryRepository.findOne({where:{inventory_id:inventoryId}})
        const typeId = await this.vehicleTypeRepository.getId(vehicleType);
        for (let i=0; i<stockAttributeValue.length; i++){ 

            const stockAttributeattrValue = new StockAttributeValue();
            stockAttributeattrValue.value = stockAttributeValue[i].value;
            // console.log(vehicleType);
            
            stockAttributeattrValue.vehicleTypeAttribute = await this.vehicleTypeAttribute.findOne({where:{vehicleType:{type_id:typeId}}});
            stockAttributeattrValue.inventory = inventoryObj;
            // console.log(inventory)
            await this.stockValueAttributeRepository.save(stockAttributeattrValue);

            
        }
        return inventory;
    }

    async getInventory(status: String, showroomId: number): Promise<GetInventroyDto[]>{
        // let vehicleStatus = status.toUpperCase();
        const getData = this.inventoryRepository.createQueryBuilder('inventory')
        .select(['inventory_id as inventoryId','make as vehicleMake','model as vehicleModel', 'variant as vehicleVariant', 'year as modelYear','chasis_no as vehicleChasisNo','demand', 'mileage'])
        .where('inventory.status = :status',{status})
        .andWhere('inventory.showroomShowroomId = :showroomId',{showroomId});
        const result = await getData.getRawMany();
        return result;
    }

    async getInventoryDetails(inventoryId: number): Promise<Inventory>{
        // const getData = await this.stockValueAttributeRepository.createQueryBuilder('stockValueAttribute')
        // .leftJoin(VehicleTypeAttribute, 'vehicleTypeAttribute','stockValueAttribute.vehicleTypeAttributeAttributeId = vehicleTypeAttribute.attribute_id')
        // .select(['stockValueAttribute.value as value','vehicleTypeAttribute.attribute_name as attributeName'])
        // .where('stockValueAttribute.inventoryInventoryId = :inventoryId',{inventoryId});
        // const result = await getData.getRawMany();
        const Inventory = await this.inventoryRepository.findOne({relations:['showroom'],where: {inventory_id: inventoryId}})
        return Inventory;
         
    }

    async getMarketInventory(showroomId: number, status:InventoryStatus): Promise<GetInventroyDto[]>{

        // const { status, Keyword, showroomId } = getInventoryByFilterDto;
                // console.log(showroomId,status)
        const getData = this.inventoryRepository.createQueryBuilder('inventory')
        .leftJoin(VehicleType,'vehicleType', 'inventory.vehicleTypeTypeId = vehicleType.type_id')
        .select(['inventory_id as  inventoryId','make as vehicleMake','model as vehicleModel', 'variant as vehicleVariant', 'year as modelYear','demand', 'mileage', 'comments', 'vehicleType.type_name as vehicleType','grade'])
        .where('inventory.status = :status',{status})
        // .orWhere('(LOWER(`inventory`.`make`) LIKE LOWER(:Keyword) OR LOWER(inventory.model) LIKE LOWER(:Keyword) OR LOWER(inventory.variant) LIKE LOWER(:Keyword) OR inventory.year LIKE :Keyword OR inventory.demand LIKE :Keyword OR LOWER(inventory.color) LIKE LOWER(:Keyword) OR inventory.grade LIKE :Keyword )')
        .andWhere('inventory.showroomShowroomId != :showroomId',{showroomId})
        // if(Keyword)
        // getData.where('(LOWER(`inventory`.`make`) LIKE LOWER(:Keyword) OR LOWER(inventory.model) LIKE LOWER(:Keyword) OR LOWER(inventory.variant) LIKE LOWER(:Keyword) OR inventory.year LIKE :Keyword OR inventory.demand LIKE :Keyword OR LOWER(inventory.color) LIKE LOWER(:Keyword) OR inventory.grade LIKE :Keyword )')
        const result = await getData.getRawMany();
        // console.log(result);
        return result;
    }

    deleteInventory(inventoryId: number){
         this.stockValueAttributeRepository.delete({inventory:{inventory_id:inventoryId}})
        return this.inventoryRepository.delete({ inventory_id: inventoryId });
    }
    
}
