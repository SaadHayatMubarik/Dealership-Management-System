import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
// import { Notification } from './entity/Notification';
import { SendRequestDto } from './dto/sendRequest.dto';
import { Notification } from './entity/Notification';
import { Showroom } from '../showroom/entity/Showroom';
import { NotificationStatus } from './notification-status.enum';

@Controller('notification')
export class NotificationController {
    constructor(private  notificationService:NotificationService){}
    
    @Post('sendRequest')
    sendRequest(@Body()sendRequestDto:SendRequestDto): Promise<Notification>{
        return this.notificationService.sendRequest(sendRequestDto);
    }

    @Get('getRequest/:showroomId/:status')
    getRequest(@Param('showroomId') showroomId: number,@Param('status') status: string):Promise<Notification[]>{
        return this.notificationService.getRequest(showroomId,status);
    }

    // @Get('getRequestReceived/:showroomId')
    // getRequestReceived(@Param('showroomId') showroomId: number):Promise<Notification[]>{
    //     return this.notificationService.getRequestReceive(showroomId);
    // }
    @Patch('updateRequestStatus/:notificationId/:updatedStatus')
    updateRequestStatus(@Param('notificationId') notificationId: number, @Param('updatedStatus')updatedStatus:NotificationStatus) {
        return this.notificationService.updateRequestStatus(notificationId,updatedStatus);
    }
}
