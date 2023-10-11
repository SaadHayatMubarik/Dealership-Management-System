import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MultiValueAttribute } from './Multi-value-attribute';
import { Repository } from 'typeorm';
import { VehicleTypeAttribute } from '../vehicle-type-attribute/Vehicle-type-attribute';
import { MultiValueAttributeDto } from './multi-value-attribute.dto';


@Injectable()
export class MultiValueAttributeService {

    constructor(
        @InjectRepository(MultiValueAttribute)
        private multiValueAttributeRepository: Repository<MultiValueAttribute>,
        @InjectRepository(VehicleTypeAttribute)
        private vehicleTypeAttributeRepository: Repository<VehicleTypeAttribute>
    ){}

    async addMultiValueAttributes(addMultiValueAttributeDto: MultiValueAttributeDto): Promise<MultiValueAttribute>{
        const multiValueAttribute = new MultiValueAttribute();
        const { attributeName, attributeValue } = addMultiValueAttributeDto;
        const queryBuilder = this.vehicleTypeAttributeRepository.createQueryBuilder('vehicleTypeAttribute');
        const attributeId = await queryBuilder
        .select('vehicleTypeAttribute.attribute_id')
        .where('vehicleTypeAttribute.attribute_name = :attributeName', { attributeName })
        .getOne();
        multiValueAttribute.vehicleTypeAttribute = attributeId;
        multiValueAttribute.attribute_value = attributeValue;
        await this.multiValueAttributeRepository.save(multiValueAttribute);
        return multiValueAttribute;
    }
    // getAttributeType(addMultiValueAttributeDto: MultiValueAttributeDto){
    //     const { attributeName } = addMultiValueAttributeDto;
    //     const queryBuilder = this.vehicleTypeAttributeRepository.createQueryBuilder('vehicleTypeAttribute');
    //     const inputType = queryBuilder
    //     .select('vehicleTypeAttribute.input_type')
    //     .where('vehicleTypeAttribute.attribute_name = :attributeName', { attributeName })
    //     .getOne();
    //     return inputType;
    // }
    async getMultiValueAttributeByAttributeId(attributeName:string): Promise<MultiValueAttribute[]>{
        const queryBuilder = this.vehicleTypeAttributeRepository.createQueryBuilder('vehicleTypeAttribute');
        const attributeId = await queryBuilder
        .select('vehicleTypeAttribute.attribute_id')
        .where('vehicleTypeAttribute.attribute_name = :attributeName', { attributeName })
        .getOne();

        const id = attributeId.attribute_id;

        const queryBuildertwo = this.multiValueAttributeRepository.createQueryBuilder('multiValueAttribute')
        .select('multiValueAttribute.attribute_value')
        .where('multiValueAttribute.vehicleTypeAttributeAttributeId = :id', { id });
        
        const attributes = await queryBuildertwo.getRawMany();
    return attributes;
    }

    deleteMultiValueAttributeByValue(attributeValue: string){
        return this.multiValueAttributeRepository.delete({ attribute_value: attributeValue.toLowerCase() });
    }
}
