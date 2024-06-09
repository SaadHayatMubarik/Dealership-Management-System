import { IsNotEmpty, IsOptional } from "class-validator";
import { EmployeeStatus } from "../employee-status.enum";

export class UpdateEmployeeDto{
    @IsNotEmpty()
    employee_id: number;

    @IsNotEmpty()
    employee_name: string;

    @IsNotEmpty()
    employee_cnic: string;

    @IsNotEmpty()
    employee_position: string;

    @IsNotEmpty()
    employee_status: EmployeeStatus;

    @IsNotEmpty()
    employee_phone_no: string;

    @IsNotEmpty()
    employee_email: string;

    @IsNotEmpty()    
    employee_salary: number;

    @IsNotEmpty()
    joining_date: Date;

    @IsOptional()
    Termination_date: Date;

    @IsNotEmpty()
    shift_time: string;

    @IsNotEmpty()
    total_leaves: number;

    @IsNotEmpty()
    available_leaves: number;

    

}