import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { InventoryService } from './entities/inventory/inventory.service';
// import { InventoryModule } from './entities/inventory/inventory.module';
// import { typeOrmConfig } from './entities/typeorm/config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './typeorm/config/typeorm.config';
import { VehicleTypeModule } from './modules/vehicle-type/vehicle-type.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { VehicleTypeAttributeModule } from './modules/vehicle-type-attribute/vehicle-type-attribute.module';
import { MultiValueAttributeModule } from './modules/multi-value-attribute/multi-value-attribute.module';
// import { VehicleTypeModule } from './entities/vehicle-type/vehicle-type.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    InventoryModule,
    VehicleTypeModule,
    VehicleTypeAttributeModule,
    MultiValueAttributeModule,
  ],
  // controllers: [AppController],
  // providers: [AppService, InventoryService],
})
export class AppModule {}
