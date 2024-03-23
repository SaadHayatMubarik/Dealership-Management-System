import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerType } from './customer-type.enum';
import { Customer } from './entity/Customer';
import { CustomerCatagory } from './customer-catagory.enum';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService){}

    @Post('addCustomer')
    addCustomer(@Body() createCustomerDto: CreateCustomerDto) {
        console.log(createCustomerDto);
        return this.customerService.addCustomer(createCustomerDto)
    }
 
    @Get('getCustomer/:showroomId/:customerCategory')
    getCustomer(@Param('showroomId') showroomId: number, @Param('customerCategory') CustomerCatagory:CustomerCatagory): Promise<Customer[]>{
        // console.log(showroomId, customerType)
        return this.customerService.getCustomer(showroomId,CustomerCatagory)
    }

    @Get('getCustomer/:showroomId/:customerCategory/:customerType')
    getCustomerByType(@Param('showroomId') showroomId: number, @Param('customerCategory') CustomerCatagory:CustomerCatagory, @Param('customerType') customerType: CustomerType): Promise<Customer[]>{
        // console.log(showroomId, customerType)
        return this.customerService.getCustomerByType(showroomId,CustomerCatagory,customerType);
    }

    @Get('getCustomerDetails/:customerId')
    getCustomerDetails(@Param('customerId') customerId: number): Promise<Customer> {
        return this.customerService.getCustomerDetails(customerId);
    }

    @Get('getCustomerRelation/:customerId')
    getCustomerRelation(@Param('customerId') customerId: number): Promise<Customer[]>{
        return this.customerService.getCustomerRelation(customerId);
    }

    // @Put('updateCustomer')
    // updateCustomer(@Body()updateCustomerDto: UpdateCustomerDto){
    //     return this.customerService.updateCustomer(updateCustomerDto);
    // }

    @Delete('deleteCustomer/:customerId')
    deleteCustomer(@Param('customerId') customerId: number) {
        return this.customerService.deleteCustomer(customerId);
    }
}
