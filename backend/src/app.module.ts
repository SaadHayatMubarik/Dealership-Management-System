import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleTypeModule } from './modules/vehicle-type/vehicle-type.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { VehicleTypeAttributeModule } from './modules/vehicle-type-attribute/vehicle-type-attribute.module';
import { MultiValueAttributeModule } from './modules/multi-value-attribute/multi-value-attribute.module';
import { StockAttributeValueModule } from './modules/stock-attribute-value/stock-attribute-value.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm/config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { ShowroomModule } from './modules/showroom/showroom.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    InventoryModule,
    VehicleTypeModule,
    VehicleTypeAttributeModule,
    MultiValueAttributeModule,
    StockAttributeValueModule,
    AuthModule,
    ShowroomModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
