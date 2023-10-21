import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleTypeAttribute } from './Vehicle-type-attribute';
import { Repository } from 'typeorm';
import { VehicleType } from '../vehicle-type/Vehicle-type';
import { VehicleTypeAttributeDto } from './dto/vehicle-type-attribute.dto';
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

    async addVehicleTypeAttribute (addVehicleTypeAttributeDto: VehicleTypeAttributeDto): Promise<VehicleTypeAttribute>{
        const vehicleTypeAttribute = new VehicleTypeAttribute();
        const { vehicleAttributeName , attributeInputType, vehicleTypeId, vehicleAttributeValue } = addVehicleTypeAttributeDto;

        if ( await this.vehicleTypeAttributeRepository.exist({ where: { attribute_name: vehicleAttributeName } }) == false ){
        vehicleTypeAttribute.attribute_name = vehicleAttributeName.toLowerCase();
        vehicleTypeAttribute.input_type = attributeInputType.toLowerCase();
        const queryBuilder = this.vehicleTypeRepositry.createQueryBuilder('vehicleType');
        const typeId = await queryBuilder
        .select('vehicleType.type_id')
        .where('vehicleType.type_id = :vehicleTypeId', { vehicleTypeId })
        .getOne();
        vehicleTypeAttribute.vehicleType = typeId;
        await this.vehicleTypeAttributeRepository.save(vehicleTypeAttribute);
        console.log(vehicleTypeAttribute);
            }
        
        const queryBuilderTwo = this.vehicleTypeAttributeRepository.createQueryBuilder('vehicleTypeAttribute');
        const attributeId = await queryBuilderTwo
        .select('vehicleTypeAttribute.attribute_id')
        .where('vehicleTypeAttribute.attribute_name = :vehicleAttributeName', { vehicleAttributeName })
        .getOne();

        for(let i=0; i<vehicleAttributeValue.length; i++){
        const multiValueAttribute = new MultiValueAttribute();
        multiValueAttribute.vehicleTypeAttribute = attributeId ;
        multiValueAttribute.attribute_value = vehicleAttributeValue[i];
        console.log(vehicleAttributeValue[i]);
        this.multiValueAttributeRepository.save(multiValueAttribute);
        }
        
        return vehicleTypeAttribute;
    }

    async getVehicleAttributeByType(getVehicleTypeAttributeDto: VehicleTypeAttributeDto): Promise<VehicleTypeAttribute[]>{
        const { vehicleTypeId,vehicleAttributeName,attributeInputType,vehicleAttributeValue } = getVehicleTypeAttributeDto;
        const vehicleTypeAttribute = new VehicleTypeAttribute();
        const queryBuilder = this.vehicleTypeAttributeRepository.createQueryBuilder('vehicleTypeAttribute');
        const attributes = await queryBuilder
        .select('vehicleTypeAttribute.attribute_name')
        .where('vehicleTypeAttribute.vehicleTypeTypeId = :vehicleTypeId', { vehicleTypeId })
        .getMany();

        // vehicleAttributeName = attributes
        // const queryBuildertwo = this.vehicleTypeAttributeRepository.createQueryBuilder('vehicleTypeAttribute')
        // .select('vehicleTypeAttribute.attribute_name')
        // .where('vehicleTypeAttribute.vehicleTypeTypeId = :id', { id });
        
        // const attribute = await queryBuildertwo.getRawMany();
    return attributes;
    }

    deleteVehicleTypeAttributeByName(attributeName: string){
        // console.log(attributeName);
        return this.vehicleTypeAttributeRepository.delete({ attribute_name: attributeName.toLowerCase() });
    }
}
