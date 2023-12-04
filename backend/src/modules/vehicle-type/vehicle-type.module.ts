import { Module } from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';
import { VehicleTypeController } from './vehicle-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { VehicleType } from './entity/Vehicle-type';
import { VehicleTypeAttribute } from '../vehicle-type-attribute/entity/Vehicle-type-attribute';
import { MultiValueAttribute } from '../multi-value-attribute/entity/Multi-value-attribute';
import { Showroom } from '../showroom/entity/Showroom';
import { User } from '../auth/entity/User';


@Module({
  imports: [TypeOrmModule.forFeature([VehicleType,VehicleTypeAttribute,MultiValueAttribute,Showroom,]),
  AuthModule,
], 
  controllers: [VehicleTypeController],
  providers: [VehicleTypeService,
  ]
})
export class VehicleTypeModule {}
