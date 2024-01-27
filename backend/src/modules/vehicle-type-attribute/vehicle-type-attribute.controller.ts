import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe, UseGuards, Patch } from '@nestjs/common';
import { VehicleTypeAttributeService } from './vehicle-type-attribute.service';
import { VehicleTypeAttributeDto } from './dto/vehicle-type-attribute.dto';
import { GetVehicleTypeAttributeDto } from './dto/get-vehicle-type-attribute.dto';
import { AuthGuard } from '@nestjs/passport';
import { VehicleTypeAttribute } from './entity/Vehicle-type-attribute';

@Controller('vehicle-type-attribute')
@UseGuards(AuthGuard())
export class VehicleTypeAttributeController {
    constructor( private vehicleTypeAttributeService: VehicleTypeAttributeService )
    {}

    @Post('addVehicleTypeAttribute')
    addVehicleTypeAttribute(@Body() addVehicleTypeAttributeDto: VehicleTypeAttributeDto): Promise<VehicleTypeAttribute>{
        // console.log(addVehicleTypeAttributeDto);
        return this.vehicleTypeAttributeService.addVehicleTypeAttribute(addVehicleTypeAttributeDto);
    }

    @Get('getVehicleAttribute/:showroomId')
    getVehicleAttribute(@Param('showroomId') showroomId: number): Promise<GetVehicleTypeAttributeDto[]>{
        // console.log(getVehicleTypeAttributeDto);
        return this.vehicleTypeAttributeService.getVehicleAttributeByType(showroomId);
    }

    @Get('/:vehicleTypeId')
    getVehicleAttributeById(@Param('vehicleTypeId') vehicleTypeId: number): Promise<VehicleTypeAttribute[]>{
        // console.log(vehicleTypeId);
        return this.vehicleTypeAttributeService.getVehicleAttributeById(vehicleTypeId);
    }

    @Delete('/:vehicleTypeAttributeId')
    deleteVehicleAttributeByName(@Param('vehicleTypeAttributeId') vehicleTypeAttributeId: number){
        // console.log(vehicleTypeAttributeId);
       return this.vehicleTypeAttributeService.deleteVehicleTypeAttributeByName(vehicleTypeAttributeId);
    }

    // @Patch('updateVehicleTypeAttribute')
    // updateVehicleTypeAttribute(@Body()updateVehicleTypeAttributeDto : UpdateVehicleTypeAttributeDto) {

    // }
    
}
