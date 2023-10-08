import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleTypeAttribute } from './Vehicle-type-attribute';
import { VehicleTypeAttributeController } from './vehicle-type-attribute.controller';
import { VehicleTypeAttributeService } from './vehicle-type-attribute.service';

@Module({
    imports: [TypeOrmModule.forFeature([VehicleTypeAttribute])],
    controllers: [VehicleTypeAttributeController],
    providers: [VehicleTypeAttributeService]
})
export class VehicleTypeAttributeModule {}
