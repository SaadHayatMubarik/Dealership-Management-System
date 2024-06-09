import { IsNotEmpty } from "class-validator";
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

    // @IsNotEmpty()    

}