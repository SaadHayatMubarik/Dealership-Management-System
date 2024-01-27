import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, FindOptionsWhere, Repository } from 'typeorm';
import { VehicleTypeAttributeDto } from './dto/vehicle-type-attribute.dto';
import { GetVehicleTypeAttributeDto } from './dto/get-vehicle-type-attribute.dto';
import { VehicleType } from '../vehicle-type/entity/Vehicle-type';
import { VehicleTypeAttribute } from './entity/Vehicle-type-attribute';
import { MultiValueAttribute } from '../multi-value-attribute/entity/Multi-value-attribute';

@Injectable()
export class VehicleTypeAttributeService {

    constructor(
        @InjectRepository(VehicleTypeAttribute)
        private vehicleTypeAttributeRepository: Repository<VehicleTypeAttribute>,
        @InjectRepository(VehicleType)
        private vehicleTypeRepository: Repository<VehicleType>,
        @InjectRepository(MultiValueAttribute)
        private multiValueAttributeRepository: Repository<MultiValueAttribute>,
    ){}

    async addVehicleTypeAttribute (addVehicleTypeAttributeDto: VehicleTypeAttributeDto): Promise<VehicleTypeAttribute>{
        const vehicleTypeAttribute = new VehicleTypeAttribute();
        const { vehicleAttributeName , attributeInputType, vehicleType, vehicleAttributeValue, showroomId } = addVehicleTypeAttributeDto;
        vehicleTypeAttribute.attribute_name = vehicleAttributeName;
        vehicleTypeAttribute.input_type = attributeInputType.toLowerCase();
        vehicleTypeAttribute.vehicleType =vehicleType;
        // console.log(vehicleTypeAttribute.vehicleType);
        const typeId = await this.vehicleTypeRepository.getId(vehicleType);
        if ( await this.vehicleTypeAttributeRepository.exist({ where: { attribute_name: vehicleAttributeName, vehicleType:{type_id:typeId} } }) == false ){
        await this.vehicleTypeAttributeRepository.save(vehicleTypeAttribute);
            }
            const Id = await this.vehicleTypeAttributeRepository.getId(vehicleTypeAttribute);
        for(let i=0; i<vehicleAttributeValue.length; i++){
            if ( await this.multiValueAttributeRepository.exist({ where:{ attribute_value: vehicleAttributeValue[i], vehicleTypeAttribute:{ attribute_id: Id } }}) == false  ){
        const multiValueAttribute = new MultiValueAttribute();
        multiValueAttribute.vehicleTypeAttribute = await this.vehicleTypeAttributeRepository.findOne({ where: { attribute_name: vehicleAttributeName,vehicleType:{type_id:typeId}  } }); 
        multiValueAttribute.attribute_value = vehicleAttributeValue[i];
        this.multiValueAttributeRepository.save(multiValueAttribute);
            }
        
    }
        return vehicleTypeAttribute;
    }

    async getVehicleAttributeByType(showroomId: number): Promise<GetVehicleTypeAttributeDto[]>{
        const getValue = this.multiValueAttributeRepository.createQueryBuilder('multiValueAttribute')
        .leftJoin(VehicleTypeAttribute, 'vehicleTypeAttribute' ,'multiValueAttribute.vehicleTypeAttributeAttributeId = vehicleTypeAttribute.attribute_id')
        .leftJoin(VehicleType, 'vehicleType', 'vehicleTypeAttribute.vehicleTypeTypeId = vehicleType.type_id ')
        .select(['vehicleTypeAttribute.attribute_id as vehicleAttributeId', 'vehicleType.type_name as vehicleTypeName', 'vehicleTypeAttribute.attribute_name as vehicleAttributeName', 'multiValueAttribute.attribute_value as vehicleAttributeValue', 'vehicleTypeAttribute.input_type as attributeInputType'])
        .select()
        .where('vehicleType.showroomShowroomId = :showroomId',{showroomId});
        const result = await getValue.getRawMany();
        // console.log(result);
    return result;
    }

    async getVehicleAttributeById(vehicleTypeId: number): Promise<VehicleTypeAttribute[]>{
        let getValue =await this.vehicleTypeAttributeRepository.find({ 
            relations: ['multiValueAttributes'],
            where: { vehicleType:{ type_id: vehicleTypeId } } // Specify the name of the relationship property
          });
        return getValue;
    }

    async deleteVehicleTypeAttributeByName(attributeId: number){
        await this.multiValueAttributeRepository.delete({vehicleTypeAttribute: { attribute_id: attributeId }});
        return this.vehicleTypeAttributeRepository.delete({ attribute_id: attributeId });
    }
}
