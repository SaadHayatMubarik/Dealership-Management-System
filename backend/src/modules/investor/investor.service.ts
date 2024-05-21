import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Investor } from './entity/Investor';
import { DeleteResult, Repository } from 'typeorm';
import { InvestorDto } from './dto/investor.dto';
import { Showroom } from '../showroom/entity/Showroom';
import { privateDecrypt } from 'crypto';
import { UpdateInvestorDto } from './dto/update-investor.dto';
import { CustomerAndInvestor } from '../customer/entity/CustomerAndInvestor';
import { InvestorType } from './investor-type.enum';

@Injectable()
export class InvestorService {
    constructor (
        @InjectRepository(CustomerAndInvestor)
        private investorRepository: Repository<CustomerAndInvestor>,
        @InjectRepository(Showroom)
        private showroomRepository: Repository<Showroom>
    ){}

    async addInvestor(addInvestorDto:InvestorDto): Promise<CustomerAndInvestor>{
        const { cnic, investorName, phoneNo, showroomId, investorType, address, city, email, province } = addInvestorDto;
        if(await this.investorRepository.exist({where:{cnic:cnic,showroom:{showroom_id:showroomId}}})){
            const investor = await this.investorRepository.findOneBy({cnic:cnic});
            investor.is_investor = true;
            investor.investor_type = investorType;
           return await this.investorRepository.save(investor);
        }
        else{
            const investor = new CustomerAndInvestor()
            investor.address = address;
            investor.city = city;
            investor.email = email;
            investor.province = province;
            investor.cnic = cnic;
            investor.name = investorName;
            investor.phoneNo = phoneNo;
            investor.is_investor = true;
            investor.investor_type = investorType;
            investor.showroom = await this.showroomRepository.findOneBy({showroom_id: showroomId});
            // console.log(investor);
            return await this.investorRepository.save(investor);
        }
    }
    async getInvestorDetails(investorId: number): Promise<CustomerAndInvestor>{
        return await this.investorRepository.findOne({where:{customer_and_investor_id : investorId}})
        }
        

    async getInvestor(showroomId:number):Promise<CustomerAndInvestor[]>{
        return await this.investorRepository.findBy({showroom:{showroom_id:showroomId},is_investor:true});
    }

    async getAvailableInvestor(showroomId: number): Promise<CustomerAndInvestor[]>{
        return await this.investorRepository.findBy({showroom:{showroom_id:showroomId},is_investor:true, is_customer:false})
    }

    async updateInvestor(updateInvestorDto: UpdateInvestorDto):Promise<CustomerAndInvestor>{
        const { cnic, customer_and_investor_id, name, phoneNo, province, address, city, email, investor_type } = updateInvestorDto;
        const investor = await this.investorRepository.findOneBy({customer_and_investor_id:customer_and_investor_id});
        investor.cnic = cnic;
        investor.name = name;
        investor.phoneNo = phoneNo;
        investor.province = province;
        investor.address = address;
        investor.city = city;
        investor.email = email;
        investor.investor_type = investor_type;
        return  await this.investorRepository.save(investor);
    }

    async deleteInvestor(investorId:number): Promise<DeleteResult>{
        const isCustomer = await this.investorRepository.findOne({where:{customer_and_investor_id:investorId}});
        if( isCustomer.is_customer == false){
        try{
        return await this.investorRepository.delete({customer_and_investor_id:investorId});
        }catch(e){
            throw new BadRequestException("Investor has investements can not be deleted");
    }
}
}
}
