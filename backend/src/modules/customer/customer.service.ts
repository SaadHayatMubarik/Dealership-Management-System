import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/Customer';
import { Repository } from 'typeorm';
import { CustomerType } from './customer-type.enum';

@Injectable()
export class CustomerService {
    constructor (
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>
    ){}

    async getCustomer(showroomId: number, customerType:CustomerType):  Promise<Customer[]>{
        return await this.customerRepository.findBy({showroom:{showroom_id:showroomId}, type:customerType});
    }

    async getCustomerDetails(customerId: number): Promise<Customer>{
        return await this.customerRepository.findOneBy({customer_id:customerId});
    }
}
