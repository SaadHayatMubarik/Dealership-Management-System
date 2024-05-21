import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { InvestorService } from './investor.service';
// import { Investor } from './entity/Investor';
import { InvestorDto } from './dto/investor.dto';
import { UpdateInvestorDto } from './dto/update-investor.dto';
import { DeleteResult } from 'typeorm';
import { CustomerAndInvestor } from '../customer/entity/CustomerAndInvestor';

@Controller('investor')
export class InvestorController {
    constructor(private investorService: InvestorService){}

    @Post('addInvestor') 
    addInvestor(@Body()  addInvestorDto: InvestorDto): Promise<CustomerAndInvestor> {
        // console.log(addInvestorDto);
        return this.investorService.addInvestor(addInvestorDto);
    }

    @Get('getInvestor/:flag/:showroomId')
    getInvestor(@Param('flag') flag: number ,@Param('showroomId') showroomId:number): Promise<CustomerAndInvestor[]>{
        if(flag==1)
          return  this.investorService.getAvailableInvestor(showroomId);
        else if (flag==0)
        return this.investorService.getInvestor(showroomId);
    }

    @Get('getInvestorDetails/:investorId')
    getInvestorDetails(@Param('investorId') investorId: number) :Promise<CustomerAndInvestor> {
        return  this.investorService.getInvestorDetails(investorId);
    }
    @Put('updateInvestor')
    updateInvestor(@Body() updateInvestorDto:UpdateInvestorDto): Promise<CustomerAndInvestor>{
        return this.investorService.updateInvestor(updateInvestorDto);
    }

    @Delete('deleteInvestor/:investorId')
    deleteInvestor(@Param('investorId') investorId: number): Promise<DeleteResult>{
        // console.log(investorId);
        return this.investorService.deleteInvestor(investorId);
    }
}
