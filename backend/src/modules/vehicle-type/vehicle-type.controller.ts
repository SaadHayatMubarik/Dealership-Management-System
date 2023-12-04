import { Body,Post,Get,Delete,Param,Put, Controller,ValidationPipe, UsePipes, UseGuards } from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';
// import { VehicleType } from './entities/Vehicle-type';
import { VehicleTypeDto } from './dto/vehicle-type.dto';
import { AuthGuard } from '@nestjs/passport';
import { VehicleType } from './entity/Vehicle-type';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/entity/User';

@Controller('vehicle-type')
@UseGuards(AuthGuard())
export class VehicleTypeController {

    constructor(private vehicleTypeService: VehicleTypeService){    }
    @Post('addVehicleType')
    addVehicleType(@Body() addVehicleTypeDto: VehicleTypeDto): Promise<VehicleType> {
        // console.log(user.showroom.showroom_id);
        return this.vehicleTypeService.addVehicleType(addVehicleTypeDto)
    }

    @Get('/:showroomId')
    @UsePipes(new ValidationPipe())
    getVehicleType(@GetUser() user: User,@Param('showroomId') showroomId: number ): Promise<VehicleType[]>{
        // console.log( showroomId );
        return this.vehicleTypeService.getVehicleType(showroomId);
    }

    @Delete('/:vehicleTypeId')
    @UsePipes(new ValidationPipe())
    deleteVehicleType(@GetUser() user: User,@Param('vehicleTypeId') vehicleTypeId: number){
        console.log(vehicleTypeId);
        return this.vehicleTypeService.deleteVehicleType(vehicleTypeId);
    }

    // @Put('updateVehicleType')
    // updateVehicleType(@Param('vehicleType',ValidationPipe) vehicleType:string){
    //     return this.vehicleTypeService.updateVehicleType(vehicleType);
    // }

}
