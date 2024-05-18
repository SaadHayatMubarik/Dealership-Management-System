import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from '../inventory/entity/Inventory';
// import { Investor } from '../investor/entity/Investor';
import { CustomerAndInvestor } from '../customer/entity/CustomerAndInvestor';


@Module({
    imports: [
        TypeOrmModule.forFeature([Inventory, CustomerAndInvestor])
    ]   
})
export class AccountModule {}
