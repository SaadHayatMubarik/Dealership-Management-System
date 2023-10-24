import { Module } from '@nestjs/common';
import { MultiValueAttributeService } from './multi-value-attribute.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MultiValueAttribute } from './entities/Multi-value-attribute';
import { VehicleTypeAttribute } from '../vehicle-type-attribute/entities/Vehicle-type-attribute';
import { MultiValueAttributeController } from './multi-value-attribute.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MultiValueAttribute,VehicleTypeAttribute])],
  controllers: [MultiValueAttributeController],
  providers: [MultiValueAttributeService]
})
export class MultiValueAttributeModule {}
