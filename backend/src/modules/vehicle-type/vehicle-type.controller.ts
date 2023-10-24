import { Body,Post,Get,Delete,Param,Put, Controller,ValidationPipe, UsePipes } from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';
import { VehicleType } from './entities/Vehicle-type';
import { VehicleTypeDto } from './dto/vehicle-type.dto';

@Controller('vehicle-type')
export class VehicleTypeController {

    constructor(private vehicleTypeService: VehicleTypeService){    }
    @Post('addVehicleType')
    addVehicleType(@Body() addVehicleTypeDto: VehicleTypeDto): Promise<VehicleType> {
        return this.vehicleTypeService.addVehicleType(addVehicleTypeDto)
    }

    @Get('getVehicleType')
    getVehicleType(): Promise<VehicleType[]>{
        return this.vehicleTypeService.getVehicleType();
    }

    @Delete('/:vehicleTypeId')
    @UsePipes(new ValidationPipe())
    deleteVehicleType(@Param('vehicleTypeId') vehicleTypeId: number){
        return this.vehicleTypeService.deleteVehicleType(vehicleTypeId);
    }

    // @Put('updateVehicleType')
    // updateVehicleType(@Param('vehicleType',ValidationPipe) vehicleType:string){
    //     return this.vehicleTypeService.updateVehicleType(vehicleType);
    // }

}
