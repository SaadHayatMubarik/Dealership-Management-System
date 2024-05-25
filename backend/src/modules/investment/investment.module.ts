import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investment } from './entity/Investment';
import { InvestmentController } from './investment.controller';
import { InvestmentService } from './investment.service';

@Module({
    imports:[TypeOrmModule.forFeature([Investment])],
    controllers:[InvestmentController],
    providers:[InvestmentService]
})
export class InvestmentModule {}
