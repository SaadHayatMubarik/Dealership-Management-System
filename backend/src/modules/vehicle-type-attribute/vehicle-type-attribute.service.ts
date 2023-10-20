import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleTypeAttribute } from './Vehicle-type-attribute';
import { Repository } from 'typeorm';
import { VehicleType } from '../vehicle-type/Vehicle-type';
import { GetVehicleTypeAttributeDto } from './dto/get-vehicle-type-attribute.dto';
import { AddVehicleTypeAttributeDto } from './dto/add-vehicle-type-attribute.dto';
import { MultiValueAttribute } from '../multi-value-attribute/Multi-value-attribute';

@Injectable()
export class VehicleTypeAttributeService {

    constructor(
        @InjectRepository(VehicleTypeAttribute)
        private vehicleTypeAttributeRepository: Repository<VehicleTypeAttribute>,
        @InjectRepository(VehicleType)
        private vehicleTypeRepositry: Repository<VehicleType>,
        @InjectRepository(MultiValueAttribute)
        private multiValueAttributeRepository: Repository<MultiValueAttribute>,
    ){}

    async addVehicleTypeAttribute (addVehicleTypeAttributeDto: AddVehicleTypeAttributeDto): Promise<VehicleTypeAttribute>{
        const vehicleTypeAttribute = new VehicleTypeAttribute();
        const multiValueAttribute = new MultiValueAttribute();
        const { attributeName , inputType, typeName, attributeValue} = addVehicleTypeAttributeDto;

        if ( await this.vehicleTypeAttributeRepository.exist({ where: { attribute_name: attributeName } }) == false ){
        const queryBuilder = this.vehicleTypeRepositry.createQueryBuilder('vehicleType');
        const typeId = await queryBuilder
        .select('vehicleType.type_id')
        .where('vehicleType.type_name = :typeName', { typeName })
        .getOne();
        vehicleTypeAttribute.attribute_name = attributeName.toLowerCase();
        vehicleTypeAttribute.input_type = inputType.toLowerCase();
        vehicleTypeAttribute.vehicleType = typeId;
        await this.vehicleTypeAttributeRepository.save(vehicleTypeAttribute);
            }
        
        const queryBuilderTwo = this.vehicleTypeAttributeRepository.createQueryBuilder('vehicleTypeAttribute');
        const attributeId = await queryBuilderTwo
        .select('vehicleTypeAttribute.attribute_id')
        .where('vehicleTypeAttribute.attribute_name = :attributeName', { attributeName })
        .getOne();
        // const attributeId = await this.vehicleTypeAttributeRepository.count();
        multiValueAttribute.vehicleTypeAttribute = attributeId ;
        multiValueAttribute.attribute_value = attributeValue;
        await this.multiValueAttributeRepository.save(multiValueAttribute);
        
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

        const queryBuildertwo = this.vehicleTypeAttributeRepository.createQueryBuilder('vehicleTypeAttribute')
        .select('vehicleTypeAttribute.attribute_name')
        .where('vehicleTypeAttribute.vehicleTypeTypeId = :id', { id });
        
        const attributes = await queryBuildertwo.getRawMany();
    return attributes;
    }

    deleteVehicleTypeAttributeByName(attributeName: string){
        // console.log(attributeName);
        return this.vehicleTypeAttributeRepository.delete({ attribute_name: attributeName.toLowerCase() });
    }
}
