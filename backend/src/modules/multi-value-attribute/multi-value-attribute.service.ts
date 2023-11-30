import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { MultiValueAttributeDto } from './dto/multi-value-attribute.dto';
import { MultiValueAttribute } from './entity/Multi-value-attribute';
import { VehicleTypeAttribute } from '../vehicle-type-attribute/entity/Vehicle-type-attribute';


@Injectable()
export class MultiValueAttributeService {

    constructor(
        @InjectRepository(MultiValueAttribute)
        private multiValueAttributeRepository: Repository<MultiValueAttribute>,
        @InjectRepository(VehicleTypeAttribute)
        private vehicleTypeAttributeRepository: Repository<VehicleTypeAttribute>
    ){}

    // async addMultiValueAttributes(addMultiValueAttributeDto: MultiValueAttributeDto): Promise<MultiValueAttribute>{
    //     const multiValueAttribute = new MultiValueAttribute();
    //     const { attributeName, attributeValue } = addMultiValueAttributeDto;
    //     const queryBuilder = this.vehicleTypeAttributeRepository.createQueryBuilder('vehicleTypeAttribute');
    //     const attributeId = await queryBuilder
    //     .select('vehicleTypeAttribute.attribute_id')
    //     .where('vehicleTypeAttribute.attribute_name = :attributeName', { attributeName })
    //     .getOne();
    //     multiValueAttribute.vehicleTypeAttribute = attributeId;
    //     multiValueAttribute.attribute_value = attributeValue;
    //     await this.multiValueAttributeRepository.save(multiValueAttribute);
    //     return multiValueAttribute;
    // }
    // getAttributeType(addMultiValueAttributeDto: MultiValueAttributeDto){
    //     const { attributeName } = addMultiValueAttributeDto;
    //     const queryBuilder = this.vehicleTypeAttributeRepository.createQueryBuilder('vehicleTypeAttribute');
    //     const inputType = queryBuilder
    //     .select('vehicleTypeAttribute.input_type')
    //     .where('vehicleTypeAttribute.attribute_name = :attributeName', { attributeName })
    //     .getOne();
    //     return inputType;
    // }
    async getMultiValueAttributeByAttributeName(attributeName:string): Promise<MultiValueAttribute[]>{
        // const queryBuilder = this.vehicleTypeAttributeRepository.createQueryBuilder('vehicleTypeAttribute');
        // const attributeId = await queryBuilder
        // .select('vehicleTypeAttribute.attribute_id')
        // .where('vehicleTypeAttribute.attribute_name = :attributeName', { attributeName })
        // .getOne();

        // const id = attributeId.attribute_id;

        // const queryBuildertwo = this.multiValueAttributeRepository.createQueryBuilder('multiValueAttribute')
        // .select('multiValueAttribute.attribute_value')
        // .where('multiValueAttribute.vehicleTypeAttributeAttributeId = :id', { id });
        
        // const attributes = await queryBuildertwo.getRawMany();
       const attributes = await this.multiValueAttributeRepository.find({ where:
         { vehicleTypeAttribute: Equal(await this.vehicleTypeAttributeRepository.findOne({ where: { attribute_name: attributeName } })) } })
    return attributes;
    }

    deleteMultiValueAttributeByValue(attributeValue: string){
        return this.multiValueAttributeRepository.delete({ attribute_value: attributeValue.toLowerCase() });
    }

    async updateMultValueAttributeByValue(updateAttributeValueDto: MultiValueAttributeDto): Promise<MultiValueAttribute>{
        const { attributeName, attributeValue, newAttributeValue } = updateAttributeValueDto;
        const attribute = await this.multiValueAttributeRepository.findOne({ where: {attribute_value: attributeValue,
             vehicleTypeAttribute:Equal(await this.vehicleTypeAttributeRepository.findOne({ where: { attribute_name: attributeName }}))
            }});
        attribute.attribute_value = newAttributeValue;
        return await this.multiValueAttributeRepository.save(attribute);
    }
    
}
