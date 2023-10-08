import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleType } from './Vehicle-type';
import { VehicleTypeDto } from './vehicle-type.dto';

@Injectable()
export class VehicleTypeService {

    constructor(
        @InjectRepository(VehicleType)
        private vehicleTypeRepositry: Repository<VehicleType>,
 
    ){}

    async addVehicleType (vehicleTypeDto: VehicleTypeDto): Promise<VehicleType>{
        const vehicleType = new VehicleType();
        const {typeName} = vehicleTypeDto;
        vehicleType.type_name = typeName;
        // console.log(vehicleTypeDto.typeName);
        await this.vehicleTypeRepositry.save(vehicleType);
        // console.log(vehicleType);
        return vehicleType;
    }

    async getVehicleType (addVehicleTypeDto:VehicleTypeDto): Promise<VehicleType[]>
    {
        return await this.vehicleTypeRepositry.find();
    }

    deleteVehicleType (vehicleType: string){
        console.log(vehicleType + " 2");
        return this.vehicleTypeRepositry.delete({ type_name: vehicleType });
    }

    // updateVehicleType (vehicleType: string){
    //     return this.vehicleTypeRepositry.update({ type_name: vehicleType });
    // }
}
