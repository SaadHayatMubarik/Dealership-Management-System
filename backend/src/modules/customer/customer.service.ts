import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Customer } from './entity/Customer';
import { DeleteResult, Repository } from 'typeorm';
import { CustomerType } from './customer-type.enum';
import { CustomerCatagory } from './customer-catagory.enum';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Showroom } from '../showroom/entity/Showroom';
// import { privateDecrypt } from 'crypto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Inventory } from '../inventory/entity/Inventory';
import { CustomerAndInvestor } from './entity/CustomerAndInvestor';
import { notEqual } from 'assert';

@Injectable()
export class CustomerService {
    constructor (
        @InjectRepository(CustomerAndInvestor)
        private customerRepository: Repository<CustomerAndInvestor>,
        @InjectRepository(Showroom)
        private showroomRepository: Repository<Showroom>,
        @InjectRepository(Inventory)
        private inventoryRepository: Repository<Inventory>
    ){}

    async addCustomer(createCustomerDto:CreateCustomerDto): Promise<CustomerAndInvestor>{
        let catagories = [CustomerCatagory.AGENT, CustomerCatagory.CUSTOMER, CustomerCatagory.DEALERSHIP];
        let types = [CustomerType.BUYER, CustomerType.SELLER];
        const { address, category, city, email, name, phoneNo, province, cnic, showroomId,type } = createCustomerDto;
        if(await this.customerRepository.exist({where:{cnic:cnic, showroom:{showroom_id:showroomId}}}) == false){
        const customer = new CustomerAndInvestor();
        customer.address = address;
        customer.city = city;
        customer.cnic = cnic;
        customer.email = email;
        customer.name = name;
        customer.province = province;
        customer.phoneNo = phoneNo;
        customer.is_customer=true;
        for(let i=0; i<catagories.length;i++){
        if(type == types[i])
        customer.type = types[i]
        }
        customer.showroom = await this.showroomRepository.findOneBy({showroom_id: showroomId});
        // console.log(customer.showroom);
        for(let i=0; i<catagories.length;i++){
        if(category == catagories[i])
        customer.catagory = catagories[i];
        }
        // customer.is_customer=true;
        return await this.customerRepository.save(customer);
    }
    else{
        const customer = await this.customerRepository.findOneBy({cnic:cnic,showroom:{showroom_id:showroomId}});
        customer.is_customer = true;
        customer.catagory = category;
        customer.type = type;
        return await this.customerRepository.save(customer);
    }
    }
    async getCustomer(showroomId: number, CustomerCatagory:CustomerCatagory):  Promise<CustomerAndInvestor[]>{
        return await this.customerRepository.findBy({showroom:{showroom_id:showroomId}, catagory:CustomerCatagory, is_customer:true});
    }

    async getCustomerByType(showroomId: number, CustomerCatagory:CustomerCatagory, customerType: CustomerType){
        return await this.customerRepository.findBy({ showroom:{showroom_id:showroomId}, catagory:CustomerCatagory, type: customerType, is_customer:true })
    }

    async getCustomerDetails(customerId: number): Promise<CustomerAndInvestor>{
        return await this.customerRepository.findOneBy({customer_and_investor_id:customerId});
    }

    async getCustomerRelation(customerId: number): Promise<CustomerAndInvestor[]>{
        return await this.customerRepository.find({relations:['inventories'], where: {customer_and_investor_id:customerId}});
    }

    async getAvailableCustomerByShowroomId(showroomId: number): Promise<CustomerAndInvestor[]>{
        return await this.customerRepository.find({where:{showroom:{showroom_id:showroomId},is_customer:true,is_investor:false}});
    }

    async updateCustomer(updateCustomerDto:UpdateCustomerDto): Promise<CustomerAndInvestor>{
        // console.log(updateCustomerDto);
        const { address, catagory, city, cnic, customer_id, email,name,phoneNo, province, type } = updateCustomerDto;
        const customer = await this.customerRepository.findOneBy({customer_and_investor_id:customer_id});
        customer.address = address;
        customer.catagory = catagory;
        customer.city = city;
        customer.cnic = cnic;
        customer.email = email;
        customer.name = name;
        customer.phoneNo = phoneNo;
        customer.province = province;
        customer.type = type;
        return await this.customerRepository.save(customer);
    }

    async deleteCustomer(customerId: number): Promise<DeleteResult>{
        try{
            return await this.customerRepository.delete({ customer_and_investor_id: customerId });
        }catch (e){
            // console.log(e)
            throw new BadRequestException('This customer cannot be delete');
        }
    }

    // getTotalCustomer(showroomId: number): Promise<number>{
    //     return 
    // }
}
