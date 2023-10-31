import { Body,Post,Get,Delete,Param,Put, Controller,ValidationPipe, UsePipes, UseGuards } from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';
import { VehicleType } from './entities/Vehicle-type';
import { VehicleTypeDto } from './dto/vehicle-type.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('vehicle-type')
@UseGuards(AuthGuard())
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

    @Delete('/:vehicleTypeName')
    @UsePipes(new ValidationPipe())
    deleteVehicleType(@Param('vehicleTypeName') vehicleTypeName: string){
        return this.vehicleTypeService.deleteVehicleType(vehicleTypeName);
    }

    // @Put('updateVehicleType')
    // updateVehicleType(@Param('vehicleType',ValidationPipe) vehicleType:string){
    //     return this.vehicleTypeService.updateVehicleType(vehicleType);
    // }

}
