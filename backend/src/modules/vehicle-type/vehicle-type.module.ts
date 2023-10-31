import { Module } from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';
import { VehicleTypeController } from './vehicle-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleType } from './entities/Vehicle-type';
import { VehicleTypeAttribute } from '../vehicle-type-attribute/entities/Vehicle-type-attribute';
import { MultiValueAttribute } from '../multi-value-attribute/entities/Multi-value-attribute';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleType,VehicleTypeAttribute,MultiValueAttribute]),
  AuthModule,
], 
  controllers: [VehicleTypeController],
  providers: [VehicleTypeService]
})
export class VehicleTypeModule {}
