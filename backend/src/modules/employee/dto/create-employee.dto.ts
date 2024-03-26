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
    employeeStatus: string;

    @IsNotEmpty()
    employeePhoneNo: string;

    @IsNotEmpty()
    employeeEmail: string;

    @IsNotEmpty()
    employeeSalary: number;

    @IsNotEmpty()
    joiningDate: Date;

    @IsNotEmpty()
    shift_time: string;

    @IsNotEmpty()
    bonus: number;

    @IsNotEmpty()
    totalLeaves: number;

    @IsNotEmpty()
    availableLeaves: number;

}