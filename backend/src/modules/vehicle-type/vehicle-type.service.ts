import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleType } from './entities/Vehicle-type';
import { VehicleTypeDto } from './dto/vehicle-type.dto';
import { VehicleTypeAttribute } from '../vehicle-type-attribute/entities/Vehicle-type-attribute';
import { MultiValueAttribute } from '../multi-value-attribute/entities/Multi-value-attribute';
import { VehicleTypeAttributeService } from '../vehicle-type-attribute/vehicle-type-attribute.service';

@Injectable()
export class VehicleTypeService {

    constructor(
        @InjectRepository(VehicleType)
        private vehicleTypeRepository: Repository<VehicleType>,
        @InjectRepository(VehicleTypeAttribute)
        private vehicleTypeAttributeRepository: Repository<VehicleTypeAttribute>,
        @InjectRepository(MultiValueAttribute)
        private multiValueAttributeRepository: Repository<MultiValueAttribute>,
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

    async deleteVehicleType (vehicleTypeName: string){
        const getRecord =await this.vehicleTypeRepository.createQueryBuilder('vehicleType')
        .select('*')
        .where('vehicleType.type_name = :vehicleTypeName',{ vehicleTypeName })
        .getRawOne();
        this.multiValueAttributeRepository.delete( {vehicleTypeAttribute: await this.vehicleTypeAttributeRepository.findOne({ where: { vehicleType: getRecord } })});
        this.vehicleTypeAttributeRepository.delete({vehicleType:getRecord});
        return this.vehicleTypeRepository.delete({ type_name: vehicleTypeName.toLowerCase()});
    }

    // updateVehicleType (vehicleType: string){
    //     return this.vehicleTypeRepositry.update({ type_name: vehicleType });
    // }
}
 