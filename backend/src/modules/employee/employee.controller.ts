import { Body, Controller, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Controller('employee')
export class EmployeeController {
    constructor(private employeeService: EmployeeService){}

    @Post('addEmployee')
    addEmployee(@Body() createEmployeeDto:CreateEmployeeDto) {
        return this.employeeService.addEmployee(createEmployeeDto);
    }
}
