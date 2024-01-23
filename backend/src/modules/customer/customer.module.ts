import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entity/Customer';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Customer])
    ],
    controllers: [CustomerController],
    providers: [CustomerService]
})
export class CustomerModule {}