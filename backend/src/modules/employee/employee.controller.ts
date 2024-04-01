import { Body, Controller, Post, Headers } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Controller('employee')
export class EmployeeController {
    constructor(private employeeService: EmployeeService){}

    @Post('addEmployee')
    addEmployee(@Body() createEmployeeDto:CreateEmployeeDto, @Headers('showroomId') showroomId: number) {
        console.log(createEmployeeDto);
        return this.employeeService.addEmployee(createEmployeeDto,showroomId);
    }
}
