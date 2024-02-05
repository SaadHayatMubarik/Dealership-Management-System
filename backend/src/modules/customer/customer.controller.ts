import { Controller, Get, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerType } from './customer-type.enum';
import { Customer } from './entity/Customer';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService){}

    @Get('getCustomer/:showroomId/:customerType')
    getCustomer(@Param('showroomId') showroomId: number, @Param('customerType') customerType:CustomerType): Promise<Customer[]>{
        return this.customerService.getCustomer(showroomId,customerType)
    }

    @Get('getCustomerDetails/:customerId')
    getCustomerDetails(@Param('customerId') customerId: number): Promise<Customer> {
        return this.customerService.getCustomerDetails(customerId);
    }
}
