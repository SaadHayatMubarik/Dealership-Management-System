import { Injectable } from '@nestjs/common';
import { SendRequestDto } from './dto/sendRequest.dto';
// import { Notification } from './entity/Notification';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../inventory/entity/Inventory';
import { Showroom } from '../showroom/entity/Showroom';
import { Notification } from './entity/Notification';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private notficationRepository: Repository<Notification>,
        @InjectRepository(Inventory)
        private  inventoryRepository: Repository<Inventory>,
        @InjectRepository(Showroom)
        private  showRoomRepository : Repository <Showroom>
    ){}
    async sendRequest(sendRequestDto:SendRequestDto): Promise<Notification>{
        const { inventoryId, showroomId } = sendRequestDto;
        const notification = new Notification();
        notification.inventory = await this.inventoryRepository.findOne({where: {inventory_id:inventoryId}});
        notification.senderShowroom = await this.showRoomRepository.findOne({where:{showroom_id:showroomId}});
        notification.date = new Date();
        // notification.status
        return await this.notficationRepository.save(notification);
    } 

    // async getRequest(): Promise<Notification>{

    // }
}
