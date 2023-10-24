import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { VehicleTypeAttributeService } from './vehicle-type-attribute.service';
import { VehicleTypeAttribute } from './entities/Vehicle-type-attribute';
import { VehicleType } from '../vehicle-type/entities/Vehicle-type';
// import { GetVehicleTypeAttributeDto } from './dto/get-vehicle-type-attribute.dto';
import { VehicleTypeAttributeDto } from './dto/vehicle-type-attribute.dto';
import { MultiValueAttribute } from '../multi-value-attribute/entities/Multi-value-attribute';

@Controller('vehicle-type-attribute')
export class VehicleTypeAttributeController {
    constructor( private vehicleTypeAttributeService: VehicleTypeAttributeService )
    {}

    @Post('addVehicleTypeAttribute')
    addVehicleTypeAttribute(@Body() addVehicleTypeAttributeDto: VehicleTypeAttributeDto): Promise<VehicleTypeAttribute>{
        return this.vehicleTypeAttributeService.addVehicleTypeAttribute(addVehicleTypeAttributeDto);
    }

    @Get('/:vehicleTypeIdParam')
    getVehicleAttributeByTypeId(@Param('vehicleTypeIdParam') vehicleTypeIdParam: number): Promise<VehicleTypeAttributeDto[]>{
        // console.log(getVehicleTypeAttributeDto);
        return this.vehicleTypeAttributeService.getVehicleAttributeByType(vehicleTypeIdParam);
    }

    @Delete('/:attributeName')
    @UsePipes(new ValidationPipe())
    deleteVehicleAttributeByName(@Param('attributeName') attributeName: string):void{
        // console.log(attributeName);
        this.vehicleTypeAttributeService.deleteVehicleTypeAttributeByName(attributeName);
    }
    
}
