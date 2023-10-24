import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleTypeAttribute } from './entities/Vehicle-type-attribute';
import { VehicleTypeAttributeController } from './vehicle-type-attribute.controller';
import { VehicleTypeAttributeService } from './vehicle-type-attribute.service';
import { VehicleType } from '../vehicle-type/entities/Vehicle-type';
import { MultiValueAttribute } from '../multi-value-attribute/entities/Multi-value-attribute';

@Module({
    imports: [TypeOrmModule.forFeature([VehicleTypeAttribute,VehicleType,MultiValueAttribute])],
    controllers: [VehicleTypeAttributeController],
    providers: [VehicleTypeAttributeService]
})
export class VehicleTypeAttributeModule {}
