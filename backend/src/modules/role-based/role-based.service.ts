import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission';
import { privateDecrypt } from 'crypto';
import { Repository } from 'typeorm';
import { ActionType } from './action-type.enum';
import { Component } from './entities/component';
import { GetComponentWithPermissionDto} from './getComponentWithPermission.dto';
import { find } from 'rxjs';
import { User } from '../auth/entity/User';
import { RolePermission } from './entities/Role-Permission';

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
        private rolePermission: Repository<RolePermission>
    ){}
    async addPermission (permissionName: string, actionType: ActionType ,componentId: number): Promise<Permission>{
        const permission = new Permission();
        permission.permission_name = permissionName.toLowerCase();
        permission.action_type = actionType;
        permission.component = await this.componentRepository.findOneBy({component_id:componentId});
        return await this.permissionRepository.save(permission);
    }

    async getComponent (): Promise<any[]>{
        let object: GetComponentWithPermissionDto[] = [];
        const componentNo = await this.componentRepository.count();
        for (let i=1; i<componentNo;i++){
             object.push({component:await this.componentRepository.findOneBy({component_id:i}), permissions: await this.permissionRepository.findBy({component:{component_id:i}})});
        }
            return object;
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
