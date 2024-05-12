import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission';
import { privateDecrypt } from 'crypto';
import { In, Repository } from 'typeorm';
import { ActionType } from './action-type.enum';
import { Component } from './entities/component';
// import { GetComponentWithPermissionDto} from './getComponentWithPermission.dto';
import { find } from 'rxjs';
import { User } from '../auth/entity/User';
import { RolePermission } from './entities/Role-Permission';
import { GetComponentWithPermissionDto } from './dto/getComponentWithPermission.dto';
import { AddRolePermissionDto, ComponentPermissionDto } from './dto/addRolePermission.dto';
import { Role } from './entities/Role';
import { Showroom } from '../showroom/entity/Showroom';

@Injectable()
export class RoleBasedService {
    constructor(
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>,
        @InjectRepository(Component)
        private componentRepository: Repository<Component>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(RolePermission)
        private rolePermissionRepository: Repository<RolePermission>,
        @InjectRepository(Showroom)
        private showroomRepository: Repository<Showroom>,
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
    ){}
    async addPermission (permissionName: string, actionType: ActionType ,componentId: number): Promise<Permission>{
        const permission = new Permission();
        permission.permission_name = permissionName.toLowerCase();
        permission.action_type = actionType;
        permission.component = await this.componentRepository.findOneBy({component_id:componentId});
        return await this.permissionRepository.save(permission);
    }

    async addRolePermission (addRolePermissionDto: AddRolePermissionDto): Promise<RolePermission>{
        const { roleName, componentPermissionDto, showroomId } = addRolePermissionDto;
        let componentPermission : ComponentPermissionDto[] = [];
        componentPermission= componentPermissionDto;
        const role = new Role();
        role.role_name = roleName;
        role.showroom = await this.showroomRepository.findOneBy({showroom_id:showroomId});
        const roleObj = await this.roleRepository.save(role);
        for(let i=0 ; i<componentPermissionDto.length; i++){
            // if(componentPermission.comp)
        }
        return

    }

    async getComponent (): Promise<Component[]>{
        // let object: GetComponentWithPermissionDto[] = [];
        // const componentNo = await this.componentRepository.count();
        // for (let i=1; i<=componentNo;i++){
        //      object.push({component:await this.componentRepository.find(), permissions: await this.permissionRepository.findBy({component:{component_id:i}})});
        // }
        // console.log(object);
            return await this.componentRepository.find();
    }

    async getComponentViaRole(userId: number): Promise<Component[]>{
        const roleId = await this.userRepository.findOne({relations:['role'], where:{user_id:userId}});
        let object: GetComponentWithPermissionDto[] = [];
        let componentNo: any[] = [];
        // componentNo.push(await this.rolePermission.find({relations:['permission.component'], where:{role:{role_id:roleId}}}));
        // const componentNo[] = await this.role.count();
        // for (let i=1; i<componentNo;i++){
        //      object.push({component:await this.componentRepository.findOneBy({component_id:i}), permissions: await this.permissionRepository.findBy({component:{component_id:i}})});
        // }
        //     return object;
        return 
    }

}
