import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockAttributeValueController } from './stock-attribute-value.controller';
import { StockAttributeValueService } from './stock-attribute-value.service';
// import { Inventory } from '../inventory/entities/Inventory';
import { AuthModule } from '../auth/auth.module';
import { StockAttributeValue } from './entity/Stock-attribute-value';
import { VehicleTypeAttribute } from '../vehicle-type-attribute/entity/Vehicle-type-attribute';
import { MultiValueAttribute } from '../multi-value-attribute/entity/Multi-value-attribute';
import { Inventory } from '../inventory/entity/Inventory';

@Module({
    imports: [TypeOrmModule.forFeature([MultiValueAttribute,VehicleTypeAttribute,StockAttributeValue,Inventory])],
    controllers: [StockAttributeValueController],
    providers: [StockAttributeValueService]
})
export class StockAttributeValueModule {}
