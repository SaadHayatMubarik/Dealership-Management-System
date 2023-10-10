import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { VehicleTypeAttributeService } from './vehicle-type-attribute.service';
import { VehicleTypeAttributeDto } from './dto/vehicle-type-attribute.dto';
import { VehicleTypeAttribute } from './Vehicle-type-attribute';
import { VehicleType } from '../vehicle-type/Vehicle-type';
import { GetVehicleTypeAttributeDto } from './dto/get-vehicle-type-attribute.dto';

@Controller('vehicle-type-attribute')
export class VehicleTypeAttributeController {
    constructor( private vehicleTypeAttributeService: VehicleTypeAttributeService )
    {}

    @Post('addVehicleTypeAttribute')
    addVehicleTypeAttribute(@Body() addVehicleTypeAttributeDto: VehicleTypeAttributeDto): Promise<VehicleTypeAttribute>{
        return this.vehicleTypeAttributeService.addVehicleTypeAttribute(addVehicleTypeAttributeDto);
    }

    @Get('getVehicleTypeAttribute')
    getVehicleAttributeByType(@Body() getVehicleTypeAttributeDto: GetVehicleTypeAttributeDto): Promise<VehicleTypeAttribute[]>{
        console.log(getVehicleTypeAttributeDto);
        return this.vehicleTypeAttributeService.getVehicleAttributeByType(getVehicleTypeAttributeDto);
    }

    @Delete('/:attributeName')
    @UsePipes(new ValidationPipe())
    deleteVehicleAttributeByName(@Param('attributeName') attributeName: string):void{
        // console.log(attributeName);
        this.vehicleTypeAttributeService.deleteVehicleTypeAttributeByName(attributeName);
    }

}
