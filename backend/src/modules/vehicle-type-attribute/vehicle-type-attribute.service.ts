import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
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

        const { vehicleAttributeName , attributeInputType, vehicleType, vehicleAttributeValue } = addVehicleTypeAttributeDto;
        
        if ( await this.vehicleTypeAttributeRepository.exist({ where: { attribute_name: vehicleAttributeName } }) == false ){
        vehicleTypeAttribute.attribute_name = vehicleAttributeName.toLowerCase();
        vehicleTypeAttribute.input_type = attributeInputType.toLowerCase();
        vehicleTypeAttribute.vehicleType =vehicleType;
        await this.vehicleTypeAttributeRepository.save(vehicleTypeAttribute);
            }
        for(let i=0; i<vehicleAttributeValue.length; i++){
        const multiValueAttribute = new MultiValueAttribute();
        multiValueAttribute.vehicleTypeAttribute = await this.vehicleTypeAttributeRepository.findOne({ where: { attribute_name: vehicleAttributeName } }); ;
        multiValueAttribute.attribute_value = vehicleAttributeValue[i];
        this.multiValueAttributeRepository.save(multiValueAttribute);
        }
        
        return vehicleTypeAttribute;
    }

    async getVehicleAttributeByType(): Promise<GetVehicleTypeAttributeDto[]>{
        const getValue = this.multiValueAttributeRepository.createQueryBuilder('multiValueAttribute')
        .leftJoin(VehicleTypeAttribute, 'vehicleTypeAttribute' ,'multiValueAttribute.vehicleTypeAttributeAttributeId = vehicleTypeAttribute.attribute_id')
        .leftJoin(VehicleType, 'vehicleType', 'vehicleTypeAttribute.vehicleTypeTypeId = vehicleType.type_id ')
        .select(['vehicleType.type_name as vehicleTypeName', 'vehicleTypeAttribute.attribute_name as vehicleAttributeName', 'multiValueAttribute.attribute_value as vehicleAttributeValue', 'vehicleTypeAttribute.input_type as attributeInputType']);
        const result = await getValue.getRawMany();

    return result ;
    }

    async getVehicleAttributeById(vehicleTypeId: number): Promise<VehicleTypeAttribute[]>{
        let getValue =await this.vehicleTypeAttributeRepository.find({ 
            relations: ['multiValueAttributes'],
            where: { vehicleType: Equal(await this.vehicleTypeRepository.find({ where: { type_id:vehicleTypeId } })) } // Specify the name of the relationship property
          });

        console.log('====================================');
        console.log(getValue);
        console.log('====================================');

        return getValue
    }

    async deleteVehicleTypeAttributeByName(attributeName: string){
        // console.log(attributeName);
        const getId =await this.vehicleTypeAttributeRepository.createQueryBuilder('vehicleTypeAttribute')
        .select('*')
        .where('vehicleTypeAttribute.attribute_name = :attributeName',{ attributeName })
        .getRawOne();
        this.multiValueAttributeRepository.delete({vehicleTypeAttribute: getId});
        return this.vehicleTypeAttributeRepository.delete({ attribute_name: attributeName.toLowerCase() });
    }
}
