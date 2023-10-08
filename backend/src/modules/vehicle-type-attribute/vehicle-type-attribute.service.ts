import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleTypeAttribute } from './Vehicle-type-attribute';
import { Repository } from 'typeorm';
import { VehicleTypeAttributeDto } from './vehicle-type-attribute.dto';
import { VehicleType } from '../vehicle-type/Vehicle-type';

@Injectable()
export class VehicleTypeAttributeService {

    constructor(
        @InjectRepository(VehicleTypeAttribute)
        private vehicleTypeAttributeRepositry: Repository<VehicleTypeAttribute>,
        // private vehcileTypeRepositry: Repository<VehicleType>,
    ){}

    async addVehicleTypeAttribute (addVehicleTypeAttributeDto: VehicleTypeAttributeDto): Promise<VehicleTypeAttribute>{
        const vehicleTypeAttribute = new VehicleTypeAttribute();
        const { attributeName , inputType, typeName} = addVehicleTypeAttributeDto;
        const vehicleType = new VehicleType();
        vehicleTypeAttribute.attribute_name = attributeName;
        vehicleTypeAttribute.input_type = inputType;
        vehicleTypeAttribute.type_name = typeName;
        await this.vehicleTypeAttributeRepositry.save(vehicleTypeAttribute);
        return vehicleTypeAttribute;
    }
}
