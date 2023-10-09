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
        @InjectRepository(VehicleType)
        private vehcileTypeRepositry: Repository<VehicleType>,
    ){}

    async addVehicleTypeAttribute (addVehicleTypeAttributeDto: VehicleTypeAttributeDto): Promise<VehicleTypeAttribute>{
        const vehicleTypeAttribute = new VehicleTypeAttribute();
        const { attributeName , inputType, typeName} = addVehicleTypeAttributeDto;
        const queryBuilder = this.vehcileTypeRepositry.createQueryBuilder('vehicleType');
        const typeId = await queryBuilder
        .select('vehicleType.type_id')
        .where('vehicleType.type_name = :typeName', { typeName })
        .getOne();
        vehicleTypeAttribute.attribute_name = attributeName;
        vehicleTypeAttribute.input_type = inputType;
        vehicleTypeAttribute.vehicleType = typeId;
        await this.vehicleTypeAttributeRepositry.save(vehicleTypeAttribute);
        return vehicleTypeAttribute;
    }

    // async getVehicleTypeIdByName(typeName: string):Promise<VehicleType>{
    //     const queryBuilder = this.vehcileTypeRepositry.createQueryBuilder('vehicleType');
    //     const typeId = await queryBuilder
    //     .select('vehicleType.type_id')
    //     .where('vehicleType.type_name = :typeName', { typeName })
    //     .getOne();
    //     return typeId;
    // }

    // async getVehicleAttributeByType(  addVehicleTypeAttributeDto: VehicleTypeAttributeDto): Promise<VehicleTypeAttribute[]>{
    //     const { typeName } = addVehicleTypeAttributeDto;
    //     const queryBuilderOne = this.vehcileTypeRepositry.createQueryBuilder('vehicleType');
    //     const typeId = await queryBuilderOne
    //     .select('vehicleType.type_id')
    //     .where('vehicleType.type_name = :typeName', { typeName })
    //     .getOne();

    //     const queryBuilderTwo = this.vehcileTypeRepositry.createQueryBuilder('vehicleTypeAttribute');
    //     const search = await queryBuilderTwo
    //     .select('vehicleTypeAttribute.attribute_name')
    //     .where('vehicleTypeAttribute.vehicleTypeTypeId = :typeId', { typeId })
    //     .getMany();

        
    //     return 
    // }
}
