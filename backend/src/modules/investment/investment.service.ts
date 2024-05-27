import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Investment } from './entity/Investment';
import { Repository } from 'typeorm';

@Injectable()
export class InvestmentService {
    constructor(
        @InjectRepository(Investment)
        private investmentRepository: Repository<Investment>,

    ){}

    async getInvestment(investorId: number): Promise<Investment[]>{
        return await this.investmentRepository.find({relations:['inventory','investor'],where:{investor:{customer_and_investor_id:investorId}}})
    }
}
