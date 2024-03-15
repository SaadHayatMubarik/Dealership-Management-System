import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from '../inventory/entity/Inventory';
import { Investor } from '../investor/entity/Investor';
import { Customer } from '../customer/entity/Customer';

@Module({
    imports: [
        TypeOrmModule.forFeature([Inventory, Investor, Customer])
    ]
})
export class AccountModule {}
