import { Body,Post,Get,Delete,Param,Put, Controller,ValidationPipe, UsePipes } from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';
import { VehicleType } from './Vehicle-type';
import { VehicleTypeDto } from './vehicle-type.dto';

@Controller('vehicle-type')
export class VehicleTypeController {

    constructor(private vehicleTypeService: VehicleTypeService){    }
    @Post('addVehicleType')
    addVehicleType(@Body() addVehicleTypeDto: VehicleTypeDto): Promise<VehicleType> {
        // console.log('addVehicleTypeDto', addVehicleTypeDto);
        
        return this.vehicleTypeService.addVehicleType(addVehicleTypeDto)
    }

    @Get('getVehicleType')
    getVehicleType(vehicleTypeDto: VehicleTypeDto): Promise<VehicleType[]>{
        return this.vehicleTypeService.getVehicleType(vehicleTypeDto);
    }

    @Delete('deleteVehicleType')
    @UsePipes(new ValidationPipe())
    deleteVehicleType( vehicleType:string){
        console.log(vehicleType + " 1");
        return this.vehicleTypeService.deleteVehicleType(vehicleType);
    }

    // @Put('updateVehicleType')
    // updateVehicleType(@Param('vehicleType',ValidationPipe) vehicleType:string){
    //     return this.vehicleTypeService.updateVehicleType(vehicleType);
    // }

}
