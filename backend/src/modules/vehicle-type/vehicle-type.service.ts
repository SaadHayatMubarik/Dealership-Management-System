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
        // console.log(vehicleTypeDto);
        const vehicleType = new VehicleType();
        const {type_name} = vehicleTypeDto;
        vehicleType.type_name = type_name;
        // console.log(typeName);
        await this.vehicleTypeRepositry.save(vehicleType);
        // console.log(vehicleType);
        return vehicleType;
    }

    async getVehicleType (): Promise<VehicleType[]>
    {
        return await this.vehicleTypeRepositry.find();
    }

    deleteVehicleType (deleteVehicleTypeDto: VehicleTypeDto){
        const { type_name} = deleteVehicleTypeDto;
        return this.vehicleTypeRepositry.delete({ type_name });
    }

    // updateVehicleType (vehicleType: string){
    //     return this.vehicleTypeRepositry.update({ type_name: vehicleType });
    // }
}
