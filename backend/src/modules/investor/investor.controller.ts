import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { InvestorService } from './investor.service';
import { Investor } from './entity/Investor';
import { InvestorDto } from './dto/investor.dto';
import { UpdateInvestorDto } from './dto/update-investor.dto';
import { DeleteResult } from 'typeorm';

@Controller('investor')
export class InvestorController {
    constructor(private investorService: InvestorService){}

    @Post('addInvestor') 
    addInvestor(@Body()  addInvestorDto: InvestorDto): Promise<Investor> {
        return this.investorService.addInvestor(addInvestorDto);
    }

    @Get('getInvestor/:showroomId')
    getInvestor(@Param('showroomId') showroomId:number): Promise<Investor[]>{
        console.log(showroomId);
        return this.investorService.getInvestor(showroomId);
    }

    @Get('getInvestorDetails/:investorId')
    getInvestorDetails(@Param('investorId') investorId: number) :Promise<Investor> {
        return  this.investorService.getInvestorDetails(investorId);
    }
    @Put('updateInvestor')
    updateInvestor(@Body() updateInvestorDto:UpdateInvestorDto): Promise<Investor>{
        return this.investorService.updateInvestor(updateInvestorDto);
    }

    @Delete('deleteInvestor/:investorId')
    deleteInvestor(@Param('investorId') investorId: number): Promise<DeleteResult>{
        // console.log(investorId);
        return this.investorService.deleteInvestor(investorId);
    }
}
