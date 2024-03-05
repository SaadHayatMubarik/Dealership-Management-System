import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/Customer';
import { Repository } from 'typeorm';
import { CustomerType } from './customer-type.enum';
import { CustomerCatagory } from './customer-catagory.enum';

@Injectable()
export class CustomerService {
    constructor (
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>
    ){}

    async getCustomer(showroomId: number, CustomerCatagory:CustomerCatagory):  Promise<Customer[]>{
        return await this.customerRepository.findBy({showroom:{showroom_id:showroomId}, catagory:CustomerCatagory});
    }

    async getCustomerDetails(customerId: number): Promise<Customer>{
        return await this.customerRepository.findOneBy({customer_id:customerId});
    }
}
