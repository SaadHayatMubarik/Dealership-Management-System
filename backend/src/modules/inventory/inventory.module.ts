import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { Inventory } from './entities/Inventory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryService } from './inventory.service';
// import { VehicleType } from '../vehicle-type/Vehicle-type';
// import { VehicleTypeModule } from '../vehicle-type/vehicle-type.module';
@Module({
  imports: [TypeOrmModule.forFeature([Inventory])],
  controllers: [InventoryController],
  providers: [InventoryService]
})
export class InventoryModule {}
