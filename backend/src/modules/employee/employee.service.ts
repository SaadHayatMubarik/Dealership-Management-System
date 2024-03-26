import { Injectable } from '@nestjs/common';
import { Employee } from './entity/Employee';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
    constructor(

    ){}

    async addEmployee(createEmployeeDto:CreateEmployeeDto):Promise<Employee>{
        return
    }
}
