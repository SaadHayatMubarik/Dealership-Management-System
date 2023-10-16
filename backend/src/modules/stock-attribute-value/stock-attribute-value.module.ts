import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MultiValueAttribute } from '../multi-value-attribute/Multi-value-attribute';
import { VehicleTypeAttribute } from '../vehicle-type-attribute/Vehicle-type-attribute';
import { StockAttributeValue } from './Stock-attribute-value';
import { StockAttributeValueController } from './stock-attribute-value.controller';
import { StockAttributeValueService } from './stock-attribute-value.service';
import { Inventory } from '../inventory/Inventory';

@Module({
    imports: [TypeOrmModule.forFeature([MultiValueAttribute,VehicleTypeAttribute,StockAttributeValue,Inventory])],
    controllers: [StockAttributeValueController],
    providers: [StockAttributeValueService]
})
export class StockAttributeValueModule {}
