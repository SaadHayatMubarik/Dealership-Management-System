import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { ShowRoom } from './entity/Showroom';
import { Repository } from 'typeorm';
import { Showroom } from './entity/Showroom';

@Injectable()
export class ShowroomService {

    constructor (
        @InjectRepository(Showroom) 
        private showroomRepository: Repository<Showroom>
    ){}
    async getShowroom(showroomId: number): Promise<Showroom[]>{
        return this.showroomRepository.find({where:{}})
    }
}
