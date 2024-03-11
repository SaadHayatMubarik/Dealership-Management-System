import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entity/Customer';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Showroom } from '../showroom/entity/Showroom';

@Module({
    imports: [
        TypeOrmModule.forFeature([Customer, Showroom])
    ],
    controllers: [CustomerController],
    providers: [CustomerService]
})
export class CustomerModule {}
