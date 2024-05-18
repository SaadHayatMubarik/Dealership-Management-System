import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerType } from './customer-type.enum';
// import { Customer } from './entity/Customer';
import { CustomerCatagory } from './customer-catagory.enum';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { DeleteResult } from 'typeorm';
import { Showroom } from '../showroom/entity/Showroom';
import { CustomerAndInvestor } from './entity/CustomerAndInvestor';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService){}

    @Post('addCustomer')
    addCustomer(@Body() createCustomerDto: CreateCustomerDto): Promise<CustomerAndInvestor>{
        // console.log(createCustomerDto);
        return this.customerService.addCustomer(createCustomerDto)
    }
 
    @Get('getCustomer/:showroomId/:customerCategory')
    getCustomer(@Param('showroomId') showroomId: number, @Param('customerCategory') CustomerCatagory:CustomerCatagory): Promise<CustomerAndInvestor[]>{
        // console.log(showroomId, customerType)
        return this.customerService.getCustomer(showroomId,CustomerCatagory)
    }

    @Get('getCustomer/:showroomId/:customerCategory/:customerType')
    getCustomerByType(@Param('showroomId') showroomId: number, @Param('customerCategory') CustomerCatagory:CustomerCatagory, @Param('customerType') customerType: CustomerType): Promise<CustomerAndInvestor[]>{
        // console.log(showroomId, customerType)
        return this.customerService.getCustomerByType(showroomId,CustomerCatagory,customerType);
    }

    @Get('getCustomerDetails/:customerId')
    getCustomerDetails(@Param('customerId') customerId: number): Promise<CustomerAndInvestor> {
        return this.customerService.getCustomerDetails(customerId);
    }

    @Get('getCustomerRelation/:customerId')
    getCustomerRelation(@Param('customerId') customerId: number): Promise<CustomerAndInvestor[]>{
        return this.customerService.getCustomerRelation(customerId);
    }

    @Put('updateCustomer')
    updateCustomer(@Body()updateCustomerDto: UpdateCustomerDto): Promise<CustomerAndInvestor>{
        // console.log(updateCustomerDto);
        return this.customerService.updateCustomer(updateCustomerDto);
    }

    @Delete('deleteCustomer/:customerId')
    deleteCustomer(@Param('customerId') customerId: number): Promise<DeleteResult> {
        return this.customerService.deleteCustomer(customerId);
    }

    // @Get('dashboard/TotalCustomer/:showroomId')
    // getTotalCustomer(@Param('showroomId') showroomId: number): Promise <number> {
    //     return this.customerService.getTotalCustomer(showroomId);
    // }
}
