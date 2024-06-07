import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Inventory } from '../inventory/entity/Inventory';
// import { Investor } from '../investor/entity/Investor';
// import { CustomerAndInvestor } from '../customer/entity/CustomerAndInvestor';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Showroom } from '../showroom/entity/Showroom';
import { Account } from './entity/Account';


@Module({
    imports: [
        TypeOrmModule.forFeature([Account, Showroom])
    ]   ,
    controllers:[AccountController],
    providers:[AccountService]
})
export class AccountModule {}
