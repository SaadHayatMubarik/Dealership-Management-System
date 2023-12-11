import { Injectable } from '@nestjs/common';
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
        // const userinfo = new User()
        const {vehicleTypeName, showroomId} = vehicleTypeDto;
        // console.log(vehicleTypeDto);
        // let showRoomData = await this.showroomRepository.findOne({where:{showroom_id:showroomId}});
        if ( await this.vehicleTypeRepository.exist({ where: { type_name: vehicleTypeName, showroom: { showroom_id: showroomId }} }) == false ){
        vehicleType.type_name = vehicleTypeName;
        vehicleType.showroom = await this.showroomRepository.findOne({ where: { showroom_id: showroomId } });
        await this.vehicleTypeRepository.save(vehicleType);
        }
        return vehicleType;
    }

    async getVehicleType (showroomId: number): Promise<VehicleType[]>
    {

        // const showroomObj = await this.showroomRepository.findOne({ where: { showroom_id: showroomId } });
        return await this.vehicleTypeRepository.find({ where: { showroom: { showroom_id: showroomId  } }});
                            
    }

    async deleteVehicleType (vehicleTypeId: number){
        // const getRecord =await this.vehicleTypeRepository.findOne({ where: { type_id: vehicleTypeId } });
    //    await this.multiValueAttributeRepository.delete( {vehicleTypeAttribute: { vehicleType: { type_id: vehicleTypeId } } });
    //    await this.vehicleTypeAttributeRepository.delete({vehicleType: { type_id: vehicleTypeId }});
    //     return await this.vehicleTypeRepository.delete({ type_id: vehicleTypeId});
    }

    // updateVehicleType (vehicleType: string){
    //     return this.vehicleTypeRepositry.update({ type_name: vehicleType });
    // }
}
 