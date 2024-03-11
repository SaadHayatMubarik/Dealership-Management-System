import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/Customer';
import { Repository } from 'typeorm';
import { CustomerType } from './customer-type.enum';
import { CustomerCatagory } from './customer-catagory.enum';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Showroom } from '../showroom/entity/Showroom';
import { privateDecrypt } from 'crypto';

@Injectable()
export class CustomerService {
    constructor (
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
        @InjectRepository(Showroom)
        private showroomRepository: Repository<Showroom>
    ){}

    async addCustomer(createCustomerDto:CreateCustomerDto){
        let catagories = [CustomerCatagory.AGENT, CustomerCatagory.CUSTOMER, CustomerCatagory.DEALERSHIP];
        let types = [CustomerType.BUYER, CustomerType.SELLER];
        const { address, category, city, email, name, phoneNo, province, cnic, showroomId,type } = createCustomerDto;
        const customer = new Customer();
        customer.address = address;
        customer.city = city;
        customer.cnic = cnic;
        customer.email = email;
        customer.name = name;
        customer.province = province;
        customer.phone_number = phoneNo;
        for(let i=0; i<catagories.length;i++){
        if(type == types[i])
        customer.type = types[i]
        }
        customer.showroom = await this.showroomRepository.findOneBy({showroom_id: showroomId});
        for(let i=0; i<catagories.length;i++){
        if(category == catagories[i])
        customer.catagory = catagories[i];
        }
        return await this.customerRepository.save(customer);
    }
    async getCustomer(showroomId: number, CustomerCatagory:CustomerCatagory):  Promise<Customer[]>{
        return await this.customerRepository.findBy({showroom:{showroom_id:showroomId}, catagory:CustomerCatagory});
    }

    async getCustomerDetails(customerId: number): Promise<Customer>{
        return await this.customerRepository.findOneBy({customer_id:customerId});
    }
}
