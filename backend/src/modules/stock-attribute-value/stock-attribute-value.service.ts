import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockAttributeValue } from './Stock-attribute-value';
import { Repository } from 'typeorm';
import { MultiValueAttribute } from '../multi-value-attribute/Multi-value-attribute';
import { StockAttributeValueDto } from './stock-attribute-value.dto';
import { Inventory } from '../inventory/Inventory';
import { VehicleTypeAttribute } from '../vehicle-type-attribute/Vehicle-type-attribute';

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
        .select('multiValueAttribute.attribute_id')
        .where('multiValueAttribute.attribute_name = :attributeValue', { attributeValue })
        .getOne();
        stockAttributeValue.multiValueAttribute = multiValueId;

        const queryBuilderTwo = this.vehicleTypeAttributeRepository.createQueryBuilder('multiValueAttribute');
        const attributeId = await queryBuilderTwo
        .select('multiValueAttribute.vehicleTypeAttributeAttributeId')
        .where('multiValueAttribute.attribute_name = :attributeName', { attributeName })
        .getOne();
        stockAttributeValue.vehicleTypeAttribute = attributeId;
        const inventoryId = await this.inventoryRepository.count();
        stockAttributeValue.inventory.inventory_id = inventoryId;

        await this.stockAttributeValueRepository.save(stockAttributeValue);
        return stockAttributeValue;
        

        
    }
}
