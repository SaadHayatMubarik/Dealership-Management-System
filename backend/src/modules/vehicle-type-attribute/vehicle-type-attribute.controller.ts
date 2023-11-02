import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { VehicleTypeAttributeService } from './vehicle-type-attribute.service';
import { VehicleTypeAttribute } from './entities/Vehicle-type-attribute';
import { VehicleType } from '../vehicle-type/entities/Vehicle-type';
// import { GetVehicleTypeAttributeDto } from './dto/get-vehicle-type-attribute.dto';
import { VehicleTypeAttributeDto } from './dto/vehicle-type-attribute.dto';
import { MultiValueAttribute } from '../multi-value-attribute/entities/Multi-value-attribute';
import { GetVehicleTypeAttributeDto } from './dto/get-vehicle-type-attribute.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('vehicle-type-attribute')
// @UseGuards(AuthGuard())
export class VehicleTypeAttributeController {
    constructor( private vehicleTypeAttributeService: VehicleTypeAttributeService )
    {}

    @Post('addVehicleTypeAttribute')
    addVehicleTypeAttribute(@Body() addVehicleTypeAttributeDto: VehicleTypeAttributeDto): Promise<VehicleTypeAttribute>{
        return this.vehicleTypeAttributeService.addVehicleTypeAttribute(addVehicleTypeAttributeDto);
    }

    @Get('getVehicleAttribute')
    getVehicleAttribute(): Promise<GetVehicleTypeAttributeDto[]>{
        // console.log(getVehicleTypeAttributeDto);
        return this.vehicleTypeAttributeService.getVehicleAttributeByType();
    }

    @Get('/:vehicleTypeId')
    getVehicleAttributeById(@Param('vehicleTypeId') vehicleTypeId: number): Promise<VehicleTypeAttribute[]>{
        return this.vehicleTypeAttributeService.getVehicleAttributeById(vehicleTypeId);
    }

    @Delete('/:selectedVehicleTypeAttributeName')
    @UsePipes(new ValidationPipe())
    deleteVehicleAttributeByName(@Param('selectedVehicleTypeAttributeName') selectedVehicleTypeAttributeName: string):void{
        // console.log(attributeName);
        this.vehicleTypeAttributeService.deleteVehicleTypeAttributeByName(selectedVehicleTypeAttributeName);
    }
    
}
