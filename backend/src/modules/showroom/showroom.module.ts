import { Module } from '@nestjs/common';
import { ShowroomService } from './showroom.service';
import { ShowroomController } from './showroom.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Showroom } from './entity/Showroom';
import { Employee } from '../employee/entity/Employee';
import { Expense } from '../expense/entity/Expense';
// import { ShowRoom } from './entity/Showroom';

@Module({
  imports: [TypeOrmModule.forFeature([Showroom,Employee,Expense])],
  providers: [ShowroomService],
  controllers: [ShowroomController]
})
export class ShowroomModule {}
