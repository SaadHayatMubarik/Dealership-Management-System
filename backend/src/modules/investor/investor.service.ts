import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Investor } from './entity/Investor';
import { DeleteResult, Repository } from 'typeorm';
import { InvestorDto } from './dto/investor.dto';
import { Showroom } from '../showroom/entity/Showroom';
import { privateDecrypt } from 'crypto';
import { UpdateInvestorDto } from './dto/update-investor.dto';

@Injectable()
export class InvestorService {
    constructor (
        @InjectRepository(Investor)
        private investorRepository: Repository<Investor>,
        @InjectRepository(Showroom)
        private showroomRepository: Repository<Showroom>
    ){}

    async addInvestor(addInvestorDto:InvestorDto): Promise<Investor>{
        const { capitalAmount, cnic, investorName, phoneNo, profit, showroomId } = addInvestorDto;
        const investor = new Investor();
        // investor.capital_amount = capitalAmount;
        investor.cnic = cnic;
        investor.investor_name = investorName;
        investor.phone = phoneNo;
        // investor.profit = profit;
        investor.showroom = await this.showroomRepository.findOneBy({showroom_id: showroomId});
       return await this.investorRepository.save(investor);
    }
    async getInvestorDetails(investorId: number): Promise<Investor>{
        return await this.investorRepository.findOne({where:{investor_id : investorId}})
        }
        

    async getInvestor(showroomId:number):Promise<Investor[]>{
        return await this.investorRepository.findBy({showroom:{showroom_id:showroomId}});
    }

    async updateInvestor(updateInvestorDto: UpdateInvestorDto):Promise<Investor>{
        const { cnic, investor_id, investor_name, phone } = updateInvestorDto;
        const investor = await this.investorRepository.findOneBy({investor_id:investor_id});
        investor.cnic = cnic;
        investor.investor_name = investor_name;
        investor.phone = phone;
        return  await this.investorRepository.save(investor);
    }

    async deleteInvestor(investorId:number): Promise<DeleteResult>{
        try{
        return await this.investorRepository.delete({investor_id:investorId});
        }catch(e){
            throw new BadRequestException("Investor has investements can not be deleted");
    }
}
}
