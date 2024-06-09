import { BadRequestException, Delete, Injectable } from '@nestjs/common';
import { Employee } from './entity/Employee';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Showroom } from '../showroom/entity/Showroom';
import { EmployeeStatus } from './employee-status.enum';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee)
        private employeeRepo: Repository<Employee>,
        @InjectRepository(Showroom)
        private showroomRepository: Repository<Showroom>
    ){}

    async addEmployee(createEmployeeDto:CreateEmployeeDto):Promise<Employee>{
        const { employeeCnic, employeeEmail, employeeName, employeePhoneNo, employeePosition, shiftTime, employeeSalary, joiningDate, totalLeaves, showroomId } = createEmployeeDto;
        if(await this.employeeRepo.exist({where:{employee_cnic:employeeCnic,showroom:{showroom_id:showroomId}}}) == false){
        const employee = new Employee();
        employee.employee_cnic = employeeCnic;
        employee.employee_email = employeeEmail;
        employee.employee_name = employeeName;
        employee.employee_phone_no = employeePhoneNo;
        employee.employee_position = employeePosition;
        employee.employee_salary = employeeSalary;
        employee.joining_date = joiningDate;
        employee.shift_time = shiftTime;
        employee.total_leaves = totalLeaves;
        employee.available_leaves = totalLeaves;
        employee.showroom = await this.showroomRepository.findOneBy({showroom_id:showroomId});
        return await this.employeeRepo.save(employee);
        }
    }

    async getEmployees(showroomId:number): Promise<Employee[]>{
        return await this.employeeRepo.findBy({showroom: {showroom_id:showroomId}})
    }

    async deleteEmployee(employeeId: number): Promise<DeleteResult>{
        try{
     return await this.employeeRepo.delete({employee_id: employeeId})
        } catch(e){
            throw new BadRequestException('This employee can not be deleted');
        }
    }

    async updateEmployee(updateEmployeeDto: UpdateEmployeeDto): Promise<Employee>{
        const {
             employee_id, Termination_date, available_leaves, employee_cnic, employee_email, employee_name, 
            employee_phone_no, employee_position, employee_salary, employee_status, 
            joining_date, shift_time, total_leaves 
        } = updateEmployeeDto;
        const employee = await this.employeeRepo.findOneBy({employee_id:employee_id});
        employee.Termination_date = Termination_date;
        employee.available_leaves = available_leaves;
        employee.employee_cnic = employee_cnic;
        employee.employee_email = employee_email;
        employee.employee_name = employee_name;
        employee.employee_phone_no = employee_phone_no;
        employee.employee_position = employee_position;
        employee.employee_salary = employee_salary;
        employee.employee_status = employee_status;
        employee.joining_date = joining_date;
        employee.shift_time = shift_time;
        employee.total_leaves = total_leaves;

        return await this.employeeRepo.save(employee);
    }

//     async getActiveEmployees(showroomId:number):Promise<number>{
//         return 
// }
}
