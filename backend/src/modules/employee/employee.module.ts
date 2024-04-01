import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Showroom } from '../showroom/entity/Showroom';
import { Employee } from './entity/Employee';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

@Module({
    imports: [TypeOrmModule.forFeature([Showroom, Employee])],
    controllers: [EmployeeController],
    providers:[EmployeeService]
})
export class EmployeeModule {}
