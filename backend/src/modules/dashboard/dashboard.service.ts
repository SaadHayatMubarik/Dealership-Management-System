import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from '../inventory/entity/Inventory';
import { Repository } from 'typeorm';
import { InventoryStatus } from '../inventory/inventory-status.enum';
import { Employee } from '../employee/entity/Employee';
// import { Customer } from '../customer/entity/Customer';
import { EmployeeStatus } from '../employee/employee-status.enum';
import { CustomerAndInvestor } from '../customer/entity/CustomerAndInvestor';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(Inventory)
        private inventoryRepository: Repository<Inventory>,
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
        @InjectRepository(CustomerAndInvestor)
        private customerRepository: Repository<CustomerAndInvestor>

    ){}
    async getTotalAvailableInventory(showroomId: number): Promise<{inventory: number, customer: number, employee: number}>{
        const inventory = await this.inventoryRepository.countBy({showroom: {showroom_id:showroomId}, status:InventoryStatus.AVAILABLE});
        const customer = await this.customerRepository.countBy({showroom: {showroom_id:showroomId}, is_customer:true});
        const employee = await this.employeeRepository.countBy({showroom: {showroom_id:showroomId}, employee_status:EmployeeStatus.ACTIVE});
        return {inventory, customer, employee};
      }
}
