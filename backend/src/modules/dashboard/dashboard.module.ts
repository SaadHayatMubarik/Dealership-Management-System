import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from '../inventory/entity/Inventory';
import { Employee } from '../employee/entity/Employee';
import { Customer } from '../customer/entity/Customer';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
    imports:[TypeOrmModule.forFeature([Inventory,Employee,Customer])],
    controllers: [DashboardController],
    providers: [DashboardService]
})
export class DashboardModule {}
