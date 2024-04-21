import { Body, Controller, Post, Headers, Get, Delete, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entity/Employee';
import { DeleteResult } from 'typeorm';

@Controller('employee')
export class EmployeeController {
    constructor(private employeeService: EmployeeService){}

    @Post('addEmployee')
    addEmployee(@Body() createEmployeeDto:CreateEmployeeDto): Promise<Employee> {
        // console.log(headers);
        // console.log(createEmployeeDto);
        return this.employeeService.addEmployee(createEmployeeDto);
    }
    @Get('getAllEmployees/:showroomId')
    getAllEmployees(@Param('Showroom Id') showroomId: number):Promise<Employee[]>{
        return  this.employeeService.getEmployees(showroomId);
    }
    @Delete('deleteEmployee/:employeeId')
    deleteEmployee(@Param('employeeId') employeeId :number): Promise<DeleteResult>{
        return this.employeeService.deleteEmployee(employeeId);
    }

    // @Get('dashboard/activeEmployee/:showroomId')
    // getActiveEmployee( @Param('showroomId') showroomId: number) : Promise <number>{
    //     return this.employeeService.getActiveEmployees(showroomId);
    // }
}
