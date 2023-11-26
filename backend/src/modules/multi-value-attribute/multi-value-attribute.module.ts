import { Module } from '@nestjs/common';
import { MultiValueAttributeService } from './multi-value-attribute.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MultiValueAttributeController } from './multi-value-attribute.controller';
import { AuthModule } from '../auth/auth.module';
import { VehicleTypeAttribute } from '../vehicle-type-attribute/entity/Vehicle-type-attribute';
import { MultiValueAttribute } from './entity/Multi-value-attribute';

@Module({
  imports: [TypeOrmModule.forFeature([MultiValueAttribute,VehicleTypeAttribute]),
AuthModule,
],
  controllers: [MultiValueAttributeController],
  providers: [MultiValueAttributeService]
})
export class MultiValueAttributeModule {}
