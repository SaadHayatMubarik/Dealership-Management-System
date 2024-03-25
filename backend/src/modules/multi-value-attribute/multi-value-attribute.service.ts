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

    // async getMultiValueAttributeByAttributeName(attributeName:string): Promise<MultiValueAttribute[]>{
    //    const attributes = await this.multiValueAttributeRepository.find({ where:
    //      { vehicleTypeAttribute: Equal(await this.vehicleTypeAttributeRepository.findOne({ where: { attribute_name: attributeName } })) } })
    // return attributes;
    // }

    // deleteMultiValueAttributeByValue(attributeValue: string){
    //     return this.multiValueAttributeRepository.delete({ attribute_value: attributeValue.toLowerCase() });
    // }

    // async updateMultValueAttributeByValue(updateAttributeValueDto: MultiValueAttributeDto): Promise<MultiValueAttribute>{
    //     const { attributeName, attributeValue, newAttributeValue } = updateAttributeValueDto;
    //     const attribute = await this.multiValueAttributeRepository.findOne({ where: {attribute_value: attributeValue,
    //          vehicleTypeAttribute:Equal(await this.vehicleTypeAttributeRepository.findOne({ where: { attribute_name: attributeName }}))
    //         }});
    //     attribute.attribute_value = newAttributeValue;
    //     return await this.multiValueAttributeRepository.save(attribute);
    // }
    async getVehicleAttributesById(attributeId: number): Promise<{VehicleTypeAttribute:VehicleTypeAttribute,MultiValueAttribute:MultiValueAttribute[]}>{
        
        const VehicleTypeAttribute = await this.vehicleTypeAttributeRepository.findOne({relations:['vehicleType'],where:{attribute_id:attributeId}});
        const MultiValueAttribute = await this.multiValueAttributeRepository.find({ where:{vehicleTypeAttribute:{attribute_id:attributeId}}});
        return { VehicleTypeAttribute, MultiValueAttribute }
    }
    
    
}
