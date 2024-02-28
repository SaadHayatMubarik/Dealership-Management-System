import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investor } from './entity/Investor';
import { InvestorController } from './investor.controller';
import { InvestorService } from './investor.service';
import { Showroom } from '../showroom/entity/Showroom';

@Module({
    imports: [TypeOrmModule.forFeature([Investor,Showroom])],
    controllers: [InvestorController],
    providers: [InvestorService]
})
export class InvestorModule {}
