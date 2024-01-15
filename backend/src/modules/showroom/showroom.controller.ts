import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ShowroomService } from './showroom.service';
import { Showroom } from './entity/Showroom';
import { AuthGuard } from '@nestjs/passport';
// import { ShowroomService } from './showroom.service';

@Controller('showroom')
// @UseGuards(AuthGuard())
export class ShowroomController {
    constructor(private readonly showRoomService: ShowroomService) {}
@Get('showroomDetails/:showroomId')
getShowroom(@Param('showroomId') showroomId: number) :Promise<Showroom[]>{
return this.showRoomService.getShowroom(showroomId);
}
}
