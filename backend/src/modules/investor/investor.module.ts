import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Investor } from './entity/Investor';
import { InvestorController } from './investor.controller';
import { InvestorService } from './investor.service';
import { Showroom } from '../showroom/entity/Showroom';
import { CustomerAndInvestor } from '../customer/entity/CustomerAndInvestor';

@Module({
    imports: [TypeOrmModule.forFeature([Showroom,CustomerAndInvestor])],
    controllers: [InvestorController],
    providers: [InvestorService]
})
export class InvestorModule {}
