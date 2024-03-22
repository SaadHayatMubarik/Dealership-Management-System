import { Injectable } from '@nestjs/common';
import { SendRequestDto } from './dto/sendRequest.dto';
// import { Notification } from './entity/Notification';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../inventory/entity/Inventory';
import { Showroom } from '../showroom/entity/Showroom';
import { Notification } from './entity/Notification';
import { NotificationStatus } from './notification-status.enum';

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

    async getRequest(showroomId: number, status: string): Promise<Notification[]>{
         if(status.toLowerCase() == "sent")
        return await this.notficationRepository.find({relations:['inventory','inventory.showroom'],where:{senderShowroom:{showroom_id:showroomId}}});
        if(status.toLowerCase() == "received")
        return await this.notficationRepository.find({relations:['senderShowroom'],where:{inventory:{showroom:{showroom_id:showroomId}}}});
    }

    // async getRequestReceive(showroomId: number): Promise<Notification[]>{
    //     return await this.notficationRepository.find({relations:['inventory.showroom'],where:{inventory:{showroom:{showroom_id:showroomId}}}});
    // }

    async updateRequestStatus(notificationId: number, updatedStatus:NotificationStatus){
        return  await this.notficationRepository.update({notification_id:notificationId} ,{ status : updatedStatus})
    }
}
