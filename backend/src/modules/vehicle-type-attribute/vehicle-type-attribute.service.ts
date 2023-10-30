import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleTypeAttribute } from './entities/Vehicle-type-attribute';
import { Repository } from 'typeorm';
import { VehicleType } from '../vehicle-type/entities/Vehicle-type';
import { VehicleTypeAttributeDto } from './dto/vehicle-type-attribute.dto';
import { MultiValueAttribute } from '../multi-value-attribute/entities/Multi-value-attribute';
import { GetVehicleTypeAttributeDto } from './dto/get-vehicle-type-attribute.dto';

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
        // const queryBuilder = this.vehicleTypeRepository.createQueryBuilder('vehicleType');
        // const typeId = await queryBuilder
        // .select('vehicleType.type_id')
        // .where('vehicleType.type_id = :vehicleTypeId', { vehicleTypeId })
        // .getOne();

        vehicleTypeAttribute.vehicleType =vehicleType;
        await this.vehicleTypeAttributeRepository.save(vehicleTypeAttribute);
        // console.log(vehicleTypeAttribute);
            }
        // const attributeId = await this.vehicleTypeAttributeRepository.findOne({ where: { attribute_name: vehicleAttributeName } });
        // console.log(attributeId);
        // const queryBuilderTwo = this.vehicleTypeAttributeRepository.createQueryBuilder('vehicleTypeAttribute');
        // const attributeId = await queryBuilderTwo
        // .addSelect('*')
        // .where('vehicleTypeAttribute.attribute_name = :vehicleAttributeName', { vehicleAttributeName })
        // .getRa();

        for(let i=0; i<vehicleAttributeValue.length; i++){
        const multiValueAttribute = new MultiValueAttribute();
        multiValueAttribute.vehicleTypeAttribute = await this.vehicleTypeAttributeRepository.findOne({ where: { attribute_name: vehicleAttributeName } }); ;
        multiValueAttribute.attribute_value = vehicleAttributeValue[i];
        // console.log(vehicleAttributeValue[i]);

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

    async getVehicleAttributeById(vehicleTypeId: number): Promise<GetVehicleTypeAttributeDto[]>{
        const getValue =await this.multiValueAttributeRepository.createQueryBuilder('multiValueAttribute')
        .leftJoin(VehicleTypeAttribute, 'vehicleTypeAttribute' ,'multiValueAttribute.vehicleTypeAttributeAttributeId = vehicleTypeAttribute.attribute_id')
        .leftJoin(VehicleType, 'vehicleType', 'vehicleTypeAttribute.vehicleTypeTypeId = vehicleType.type_id ')
        .select(['vehicleType.type_name as vehicleTypeName', 'vehicleTypeAttribute.attribute_name as vehicleAttributeName', 'multiValueAttribute.attribute_value as vehicleAttributeValue', 'vehicleTypeAttribute.input_type as attributeInputType'])
        .where('vehicleType.type_id = :vehicleTypeId', { vehicleTypeId })
        .getRawMany();

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
