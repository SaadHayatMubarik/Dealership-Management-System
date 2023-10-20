import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleType } from './Vehicle-type';
import { VehicleTypeDto } from './vehicle-type.dto';

@Injectable()
export class VehicleTypeService {

    constructor(
        @InjectRepository(VehicleType)
        private vehicleTypeRepository: Repository<VehicleType>,
 
    ){}

    async addVehicleType (vehicleTypeDto: VehicleTypeDto): Promise<VehicleType>{
        const vehicleType = new VehicleType();
        const {vehicleTypeName} = vehicleTypeDto;
        if ( await this.vehicleTypeRepository.exist({ where: { type_name: vehicleTypeName } }) == false ){
        vehicleType.type_name = vehicleTypeName;
        await this.vehicleTypeRepository.save(vehicleType);
        }
        // console.log(vehicleType);
        return vehicleType;
    }

    async getVehicleType (): Promise<VehicleType[]>
    {
        return await this.vehicleTypeRepository.find();
    }

    deleteVehicleType (vehicleTypeId: number){
        return this.vehicleTypeRepository.delete({ type_id: vehicleTypeId});
    }

    // updateVehicleType (vehicleType: string){
    //     return this.vehicleTypeRepositry.update({ type_name: vehicleType });
    // }
}
