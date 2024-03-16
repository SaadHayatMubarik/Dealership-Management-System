import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Showroom } from '../showroom/entity/Showroom';
import { Employee } from './entity/Employee';

@Module({
    imports: [TypeOrmModule.forFeature([Showroom, Employee])]
})
export class EmployeeModule {}
