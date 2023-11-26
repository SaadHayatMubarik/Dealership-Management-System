import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleTypeAttributeController } from './vehicle-type-attribute.controller';
import { VehicleTypeAttributeService } from './vehicle-type-attribute.service';
import { AuthModule } from '../auth/auth.module';
import { VehicleType } from '../vehicle-type/entity/Vehicle-type';
import { VehicleTypeAttribute } from './entity/Vehicle-type-attribute';
import { MultiValueAttribute } from '../multi-value-attribute/entity/Multi-value-attribute';

@Module({
    imports: [TypeOrmModule.forFeature([VehicleTypeAttribute,VehicleType,MultiValueAttribute]),
    AuthModule,
],
    controllers: [VehicleTypeAttributeController],
    providers: [VehicleTypeAttributeService]
})
export class VehicleTypeAttributeModule {}
