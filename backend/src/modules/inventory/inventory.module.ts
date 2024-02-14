import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
// import { Inventory } from './entities/Inventory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryService } from './inventory.service';
import { Inventory } from './entity/Inventory';
import { Showroom } from '../showroom/entity/Showroom';
import { VehicleType } from '../vehicle-type/entity/Vehicle-type';
import { StockAttributeValue } from '../stock-attribute-value/entity/Stock-attribute-value';
import { MultiValueAttribute } from '../multi-value-attribute/entity/Multi-value-attribute';
import { VehicleTypeAttribute } from '../vehicle-type-attribute/entity/Vehicle-type-attribute';
import { Customer } from '../customer/entity/Customer';
import { Investment } from '../investment/entity/Investment';
// import { Showroom } from '../showroom/entity/Showroom';
// import { VehicleType } from '../vehicle-type/Vehicle-type';
// import { VehicleTypeModule } from '../vehicle-type/vehicle-type.module';
@Module({
  imports: [TypeOrmModule.forFeature([Inventory,Showroom,VehicleType,StockAttributeValue,MultiValueAttribute,VehicleTypeAttribute,Customer,Investment])],
  controllers: [InventoryController],
  providers: [InventoryService]
})
export class InventoryModule {}
