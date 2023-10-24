import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleTypeAttribute } from './Vehicle-type-attribute';
import { Repository } from 'typeorm';
import { VehicleTypeAttributeDto } from './dto/vehicle-type-attribute.dto';
import { VehicleType } from '../vehicle-type/Vehicle-type';
import { GetVehicleTypeAttributeDto } from './dto/get-vehicle-type-attribute.dto';

@Injectable()
export class VehicleTypeAttributeService {

    constructor(
        @InjectRepository(VehicleTypeAttribute)
        private vehicleTypeAttributeRepositry: Repository<VehicleTypeAttribute>,
        @InjectRepository(VehicleType)
        private vehicleTypeRepositry: Repository<VehicleType>,
    ){}

    async addVehicleTypeAttribute (addVehicleTypeAttributeDto: VehicleTypeAttributeDto): Promise<VehicleTypeAttribute>{
        const vehicleTypeAttribute = new VehicleTypeAttribute();
        const { attributeName , inputType, vehicleTypeName} = addVehicleTypeAttributeDto;
        const queryBuilder = this.vehicleTypeRepositry.createQueryBuilder('vehicleType');
        const typeId = await queryBuilder
        .select('vehicleType.type_id')
        .where('vehicleType.type_name = :typeName', { vehicleTypeName })
        .getOne();
        vehicleTypeAttribute.attribute_name = attributeName.toLowerCase();
        vehicleTypeAttribute.input_type = inputType.toLowerCase();
        vehicleTypeAttribute.vehicleType = typeId;
        await this.vehicleTypeAttributeRepositry.save(vehicleTypeAttribute);
        return vehicleTypeAttribute;
    }

    async getVehicleAttributeByType(  getVehicleTypeAttributeDto: GetVehicleTypeAttributeDto): Promise<VehicleTypeAttribute[]>{
        const { typeName } = getVehicleTypeAttributeDto;
        const queryBuilder = this.vehicleTypeRepositry.createQueryBuilder('vehicleType');
        const typeId = await queryBuilder
        .select('vehicleType.type_id')
        .where('vehicleType.type_name = :typeName', { typeName })
        .getOne();

        const id = typeId.type_id;

        const queryBuildertwo = this.vehicleTypeAttributeRepositry.createQueryBuilder('vehicleTypeAttribute')
        .select('vehicleTypeAttribute.attribute_name')
        .where('vehicleTypeAttribute.vehicleTypeTypeId = :id', { id });
        
        const attributes = await queryBuildertwo.getRawMany();
    return attributes;
    }

    deleteVehicleTypeAttributeByName(attributeName: string){
        // console.log(attributeName);
        return this.vehicleTypeAttributeRepositry.delete({ attribute_name: attributeName.toLowerCase() });
    }
}
