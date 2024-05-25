import { Controller, Get, Param } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { Investment } from './entity/Investment';

@Controller('investment')
export class InvestmentController {
    constructor(private readonly investmentService: InvestmentService) {}

    @Get('getInvestment/:investorId')
    getInvestment(@Param('investorId') investorId:number): Promise<Investment[]>{
        return this.investmentService.getInvestment(investorId);
    }
}
