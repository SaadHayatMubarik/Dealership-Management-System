import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
// import { Notification } from './entity/Notification';
import { SendRequestDto } from './dto/sendRequest.dto';
import { Notification } from './entity/Notification';

@Controller('notification')
export class NotificationController {
    constructor(private  notificationService:NotificationService){}
    
    @Post('sendRequest')
    sendRequest(@Body()sendRequestDto:SendRequestDto): Promise<Notification>{
        return this.notificationService.sendRequest(sendRequestDto);
    }
}
