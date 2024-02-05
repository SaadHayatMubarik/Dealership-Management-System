import { Controller, Get, Param } from '@nestjs/common';
import { InvestorService } from './investor.service';
import { Investor } from './entity/Investor';

@Controller('investor')
export class InvestorController {
    constructor(private investorService: InvestorService){}

    @Get('getInvestor/:showroomId')
    getInvestor(@Param('showroomId') showroomId:number): Promise<Investor[]>{
        return this.investorService.getInvestor(showroomId);
    }

    // @Get('getInvestorDetails/:investorId')
    // getInvestorDetails(@Param('investorId') investorId: number) :Promise<{}> {
    //     return  this.investorService.getInvestorDetails(investorId);
    // }
}
