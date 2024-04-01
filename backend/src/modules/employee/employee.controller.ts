import { Body, Controller, Post, Headers, Get, Delete, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entity/Employee';
import { DeleteResult } from 'typeorm';

@Controller('employee')
export class EmployeeController {
    constructor(private employeeService: EmployeeService){}

    @Post('addEmployee')
    addEmployee(@Body() createEmployeeDto:CreateEmployeeDto, @Headers('Showroom Id') showroomId: number): Promise<Employee> {
        console.log(createEmployeeDto);
        return this.employeeService.addEmployee(createEmployeeDto,showroomId);
    }
    @Get('getAllEmployees/:showroomId')
    getAllEmployees(@Headers('Showroom Id') showroomId: number):Promise<Employee[]>{
        return  this.employeeService.getEmployees(showroomId);
    }
    @Delete('deleteEmployee/:employeeId')
    deleteEmployee(@Param('employeeId') employeeId :number): Promise<DeleteResult>{
        return this.employeeService.deleteEmployee(employeeId);
    }
}
