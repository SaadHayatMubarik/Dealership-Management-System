import { Body, Controller, Post } from '@nestjs/common';
import { VehicleTypeAttributeService } from './vehicle-type-attribute.service';
import { VehicleTypeAttributeDto } from './vehicle-type-attribute.dto';
import { VehicleTypeAttribute } from './Vehicle-type-attribute';
import { VehicleType } from '../vehicle-type/Vehicle-type';

@Controller('vehicle-type-attribute')
export class VehicleTypeAttributeController {
    constructor( private vehicleTypeAttributeService: VehicleTypeAttributeService )
    {}

    // @Post('addVehicleTypeAttribute')
    // addVehicleTypeAttribute(@Body() addVehicleTypeAttributeDto: VehicleTypeAttributeDto): Promise<VehicleTypeAttribute>{
    //     return this.vehicleTypeAttributeService.addVehicleTypeAttribute(addVehicleTypeAttributeDto);
    // }

}
