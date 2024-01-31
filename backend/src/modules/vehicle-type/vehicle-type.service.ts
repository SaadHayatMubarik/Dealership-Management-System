import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { VehicleTypeDto } from './dto/vehicle-type.dto';
import { VehicleTypeAttributeService } from '../vehicle-type-attribute/vehicle-type-attribute.service';
import { VehicleType } from './entity/Vehicle-type';
import { VehicleTypeAttribute } from '../vehicle-type-attribute/entity/Vehicle-type-attribute';
import { MultiValueAttribute } from '../multi-value-attribute/entity/Multi-value-attribute';
import { Showroom } from '../showroom/entity/Showroom';
import { User } from '../auth/entity/User';

@Injectable()
export class VehicleTypeService {

    constructor(
        @InjectRepository(VehicleType)
        private vehicleTypeRepository: Repository<VehicleType>,
        @InjectRepository(VehicleTypeAttribute)
        private vehicleTypeAttributeRepository: Repository<VehicleTypeAttribute>,
        @InjectRepository(MultiValueAttribute)
        private multiValueAttributeRepository: Repository<MultiValueAttribute>,
        @InjectRepository(Showroom)
        private showroomRepository: Repository<Showroom>,
    ){}

    async addVehicleType (vehicleTypeDto: VehicleTypeDto): Promise<VehicleType>{
        const vehicleType = new VehicleType();
        const {vehicleTypeName, showroomId} = vehicleTypeDto;
        if ( await this.vehicleTypeRepository.exist({ where: { type_name: vehicleTypeName, showroom: { showroom_id: showroomId }} }) == false ){
        vehicleType.type_name = vehicleTypeName;
        vehicleType.showroom = await this.showroomRepository.findOne({ where: { showroom_id: showroomId } });
        await this.vehicleTypeRepository.save(vehicleType);
        }
        return vehicleType;
    }

    async getVehicleType (showroomId: number): Promise<VehicleType[]>
    {
        return await this.vehicleTypeRepository.find({ where: { showroom: { showroom_id: showroomId  } }});
                            
    }

    async deleteVehicleType (vehicleTypeId: number){
        // write it better if have time
        const vehicleType = await this.vehicleTypeRepository.createQueryBuilder('vehicleType')
        .select('*')
        .where('vehicleType.type_id = :vehicleTypeId', { vehicleTypeId })
        .getRawOne();

        const vehicleAttribute = await this.vehicleTypeAttributeRepository.createQueryBuilder('vehicleTypeAttribute')
        .select('*')
        .where('vehicleTypeAttribute.vehicleTypeTypeId = :vehicleTypeId', { vehicleTypeId })
        .getRawOne();
        await this.multiValueAttributeRepository.delete({ vehicleTypeAttribute: vehicleAttribute });
        await this.vehicleTypeAttributeRepository.delete({ vehicleType:{ type_id:vehicleTypeId } });
        return await this.vehicleTypeRepository.delete({ type_id: vehicleTypeId});
    }

    async updateVehicleType (updatedType: string, vehicleId: number){
        const type: VehicleType = await this.vehicleTypeRepository.findOneBy({type_id:vehicleId});
        if(type.type_name !==  updatedType) 
        await this.vehicleTypeRepository.update({type_id:vehicleId},{ type_name: updatedType });
        return "updated successfully !";
    }
}
 