import { Controller, Get, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerType } from './customer-type.enum';
import { Customer } from './entity/Customer';
import { CustomerCatagory } from './customer-catagory.enum';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService){}

    @Get('getCustomer/:showroomId/:customerCategory')
    getCustomer(@Param('showroomId') showroomId: number, @Param('customerCategory') CustomerCatagory:CustomerCatagory): Promise<Customer[]>{
        // console.log(showroomId, customerType)
        return this.customerService.getCustomer(showroomId,CustomerCatagory)
    }

    @Get('getCustomerDetails/:customerId')
    getCustomerDetails(@Param('customerId') customerId: number): Promise<Customer> {
        return this.customerService.getCustomerDetails(customerId);
    }
}
