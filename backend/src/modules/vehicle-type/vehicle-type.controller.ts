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
    getVehicleType(): Promise<VehicleType[]>{
        return this.vehicleTypeService.getVehicleType();
    }

    @Delete('deleteVehicleType')
    @UsePipes(new ValidationPipe())
    deleteVehicleType(@Body() deleteVehicleTypeDto: VehicleTypeDto){
        console.log(deleteVehicleTypeDto + " 1");
        return this.vehicleTypeService.deleteVehicleType(deleteVehicleTypeDto);
    }

    // @Put('updateVehicleType')
    // updateVehicleType(@Param('vehicleType',ValidationPipe) vehicleType:string){
    //     return this.vehicleTypeService.updateVehicleType(vehicleType);
    // }

}
