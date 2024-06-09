import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleTypeModule } from './modules/vehicle-type/vehicle-type.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { VehicleTypeAttributeModule } from './modules/vehicle-type-attribute/vehicle-type-attribute.module';
import { MultiValueAttributeModule } from './modules/multi-value-attribute/multi-value-attribute.module';
import { StockAttributeValueModule } from './modules/stock-attribute-value/stock-attribute-value.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm/config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { ShowroomModule } from './modules/showroom/showroom.module';

import { JwtService } from '@nestjs/jwt';
import { CustomerService } from './modules/customer/customer.service';
import { CustomerModule } from './modules/customer/customer.module';
import { NotificationModule } from './modules/notification/notification.module';
import { Investment } from './modules/investment/entity/Investment';
import { InvestmentModule } from './modules/investment/investment.module';
import { InvestorModule } from './modules/investor/investor.module';
import { PictureModule } from './modules/picture/picture.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { RoleBasedModule } from './modules/role-based/role-based.module';
import { ExpenseModule } from './modules/expense/expense.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    InventoryModule,
    VehicleTypeModule,
    VehicleTypeAttributeModule,
    MultiValueAttributeModule,
    StockAttributeValueModule,
    AuthModule,
    ShowroomModule,
    NotificationModule,
    InvestmentModule,
    InvestorModule,
    PictureModule,
    CustomerModule,
    InvestmentModule,
    InvestorModule,
    EmployeeModule,
    DashboardModule,
    RoleBasedModule,
    ExpenseModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ]
})
export class AppModule {}
