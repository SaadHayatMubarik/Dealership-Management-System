import { IsNotEmpty } from "class-validator";
import { EmployeePerformance } from "../employee-performance.enum";

export class CreateEmployeeDto{
    @IsNotEmpty()
    employeeName: string;

    @IsNotEmpty()
    employeeCnic: string;

    @IsNotEmpty()
    employeePosition: string;

    @IsNotEmpty()
    employeePhoneNo: string;

    @IsNotEmpty()
    employeeEmail: string;

    @IsNotEmpty()
    employeeSalary: number;

    @IsNotEmpty()
    joiningDate: Date;

    @IsNotEmpty()
    shiftTime: string;

    @IsNotEmpty()
    totalLeaves: number;

}