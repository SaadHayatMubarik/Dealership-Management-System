import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Investor } from './entity/Investor';
import { Repository } from 'typeorm';

@Injectable()
export class InvestorService {
    constructor (
        @InjectRepository(Investor)
        private investorRepository: Repository<Investor>
    ){}

    // async getInvestorDetails(investorId: number): Promise<{Investor,Investment[]}>{
    //     return {
    //         await this.investorRepository.findOne({where:{investor_id : investorId}})
    //     }
    //     }

    async getInvestor(showroomId:number):Promise<Investor[]>{
        return await this.investorRepository.findBy({showroom:{showroom_id:showroomId}});
    }

}
