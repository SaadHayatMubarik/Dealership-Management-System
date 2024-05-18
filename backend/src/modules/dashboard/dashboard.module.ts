import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from '../inventory/entity/Inventory';
import { Employee } from '../employee/entity/Employee';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { CustomerAndInvestor } from '../customer/entity/CustomerAndInvestor';

@Module({
    imports:[TypeOrmModule.forFeature([Inventory,Employee,CustomerAndInvestor])],
    controllers: [DashboardController],
    providers: [DashboardService]
})
export class DashboardModule {}
