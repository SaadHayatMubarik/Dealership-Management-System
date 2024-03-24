import { Body,Post,Get,Delete,Param,Put, Controller,ValidationPipe, UsePipes, UseGuards, Patch } from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';
import { VehicleTypeDto } from './dto/vehicle-type.dto';
import { AuthGuard } from '@nestjs/passport';
import { VehicleType } from './entity/Vehicle-type';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/entity/User';
import { DeleteResult } from 'typeorm';

@Controller('vehicle-type')
// @UseGuards(AuthGuard())
export class VehicleTypeController {

    constructor(private vehicleTypeService: VehicleTypeService){    }
    @Post('addVehicleType')
    addVehicleType(@Body() addVehicleTypeDto: VehicleTypeDto): Promise<VehicleType> {
        return this.vehicleTypeService.addVehicleType(addVehicleTypeDto)
    }

    @Get('/:showroomId')
    @UsePipes(new ValidationPipe())
    getVehicleType(@Param('showroomId') showroomId: number ): Promise<VehicleType[]>{
        return this.vehicleTypeService.getVehicleType(showroomId);
    }

    @Delete('/:vehicleTypeId')
    @UsePipes(new ValidationPipe())
    deleteVehicleType(@Param('vehicleTypeId') vehicleTypeId: number): Promise<DeleteResult>{
        return this.vehicleTypeService.deleteVehicleType(vehicleTypeId);
    }

    @Patch('updateVehicleType/:updatedType/:vehicleId')
    updateVehicleType(@Param('updatedType',ValidationPipe) updatedType:string, @Param('vehicleId') vehicleId: number): Promise<VehicleType>{
        return this.vehicleTypeService.updateVehicleType(updatedType,vehicleId);
    }

}
