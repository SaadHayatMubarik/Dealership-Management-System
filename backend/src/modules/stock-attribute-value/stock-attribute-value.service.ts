import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockAttributeValue } from './entities/Stock-attribute-value';
import { Repository } from 'typeorm';
import { MultiValueAttribute } from '../multi-value-attribute/entities/Multi-value-attribute';
import { StockAttributeValueDto } from './dto/stock-attribute-value.dto';
import { Inventory } from '../inventory/entities/Inventory';
import { VehicleTypeAttribute } from '../vehicle-type-attribute/entities/Vehicle-type-attribute';

@Injectable()
export class StockAttributeValueService {

    constructor(
        @InjectRepository(StockAttributeValue)
        private stockAttributeValueRepository: Repository<StockAttributeValue>,
        @InjectRepository(MultiValueAttribute)
        private multiValueAttributeRepository: Repository<MultiValueAttribute>,
        @InjectRepository(Inventory)
        private inventoryRepository: Repository<Inventory>,
        @InjectRepository(VehicleTypeAttribute)
        private vehicleTypeAttributeRepository: Repository<VehicleTypeAttribute>
    ){}
    

    async addStockAttributeValue(addStockAttributeValueDto: StockAttributeValueDto): Promise<StockAttributeValue>{
        const stockAttributeValue = new StockAttributeValue();
        const { attributeValue, attributeName } = addStockAttributeValueDto;
        const queryBuilder = this.multiValueAttributeRepository.createQueryBuilder('multiValueAttribute');
        const multiValueId = await queryBuilder
        .select('multiValueAttribute.multi_value_id')
        .where('multiValueAttribute.attribute_value = :attributeValue', { attributeValue })
        .getOne();
        // console.log(multiValueId);
        stockAttributeValue.multiValueAttribute = multiValueId;

        const queryBuilderTwo = this.vehicleTypeAttributeRepository.createQueryBuilder('vehicleTypeAttribute');
        const attributeId = await queryBuilderTwo
        .select('vehicleTypeAttribute.attribute_id')
        .where('vehicleTypeAttribute.attribute_name = :attributeName', { attributeName })
        .getOne();
        // stockAttributeValue.vehicleTypeAttribute = attributeId;
        
        const queryBuilderThree = this.inventoryRepository.createQueryBuilder('inventory');
        const inventoryId = await queryBuilderThree
      .select('COUNT(inventory.inventory_id)' , 'inventory_id')
      .getRawOne();
    //   console.log(inventoryId);
      stockAttributeValue.inventory = inventoryId;
        await this.stockAttributeValueRepository.save(stockAttributeValue);
        return stockAttributeValue;
        
    }

    async getStockAttributeValue(inventoryId: number): Promise<StockAttributeValue[]>{
      const queryBuilder = this.vehicleTypeAttributeRepository.createQueryBuilder('stockAttributeValue');
        const attributeId = await queryBuilder
        .select('*')
        .where('stockAttributeValue.inventoryInventoryId = :inventoryId', { inventoryId })
        .getMany();
        return
        // stockAttributeValue.vehicleTypeAttribute = attributeId;
    }
}
