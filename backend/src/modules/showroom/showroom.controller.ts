import { Controller, Get, Param } from '@nestjs/common';
import { ShowroomService } from './showroom.service';
import { Showroom } from './entity/Showroom';
// import { ShowroomService } from './showroom.service';

@Controller('showroom')
export class ShowroomController {
    constructor(private readonly showRoomService: ShowroomService) {}
@Get('showroomDetails/:showroomId')
getShowroom(@Param('showroomId') showroomId: number) :Promise<Showroom[]>{
return this.showRoomService.getShowroom(showroomId);
}
}
