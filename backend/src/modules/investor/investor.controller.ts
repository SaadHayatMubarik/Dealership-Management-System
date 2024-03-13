import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InvestorService } from './investor.service';
import { Investor } from './entity/Investor';
import { InvestorDto } from './dto/investor.dto';
// import { InventoryDto } from '../inventory/dto/inventory.dto';

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
}
