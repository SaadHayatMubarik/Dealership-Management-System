import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entity/Customer';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Showroom } from '../showroom/entity/Showroom';
import { Inventory } from '../inventory/entity/Inventory';

@Module({
    imports: [
        TypeOrmModule.forFeature([Customer, Showroom,Inventory])
    ],
    controllers: [CustomerController],
    providers: [CustomerService]
})
export class CustomerModule {}
