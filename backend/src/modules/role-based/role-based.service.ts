import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission';
import { privateDecrypt } from 'crypto';
import { DeleteResult, In, Repository } from 'typeorm';
import { ActionType } from './action-type.enum';
import { Component } from './entities/component';
// import { GetComponentWithPermissionDto} from './getComponentWithPermission.dto';
import { find } from 'rxjs';
import { User } from '../auth/entity/User';
import { RolePermission } from './entities/Role-Permission';
import { GetComponentWithPermissionDto } from './dto/getComponentWithPermission.dto';
import { AddRolePermissionDto } from './dto/addRolePermission.dto';
import { Role } from './entities/Role';
import { Showroom } from '../showroom/entity/Showroom';
// import { ComponentPermissionDto } from './dto/componentPermission.dto';

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

    async addRolePermission (addRolePermissionDto: AddRolePermissionDto): Promise<RolePermission[]>{
        const { roleName, modulePermissions, showroomId } = addRolePermissionDto;
        const enums = [ActionType.ADD,ActionType.DELETE,ActionType.UPDATE,ActionType.VIEW];
        const permissionObj: Permission[] = [];
        const role = new Role();
        role.role_name = roleName;
        role.showroom = await this.showroomRepository.findOneBy({showroom_id:showroomId});
        const roleObj = await this.roleRepository.save(role);
        for(let i=0 ; i<modulePermissions.length; i++){
            const { component_id,permissions } = modulePermissions[i];
            // console.log(permissions);
            // for(let j=0; j<enums.length;j++){
                // console.log(`${permissions}.${enums[j]}`);
                if( permissions.ADD == true)
                  permissionObj.push(await this.permissionRepository.findOneBy({action_type:ActionType.ADD, component:{component_id:component_id}}));
                if(permissions.DELETE == true)
                    permissionObj.push(await this.permissionRepository.findOneBy({action_type:ActionType.DELETE, component:{component_id:component_id}}));
                if( permissions.UPDATE == true)
                    permissionObj.push(await this.permissionRepository.findOneBy({action_type:ActionType.UPDATE, component:{component_id:component_id}}));
                if( permissions.VIEW == true)
                    permissionObj.push(await this.permissionRepository.findOneBy({action_type:ActionType.VIEW, component:{component_id:component_id}}));
            // }
            
        }
        // console.log(permissionObj+"array");
        // console.log(permissionObj.length);
        let rolePermissionObj: RolePermission[] = [];
        
        for(let k=0; k<permissionObj.length; k++){
            const rolePermission = new RolePermission();
            rolePermission.role=roleObj;
            rolePermission.permission = permissionObj[k];
            rolePermissionObj.push(await this.rolePermissionRepository.save(rolePermission));
        }
        return rolePermissionObj;
    }

    async deleteRole(): Promise<DeleteResult>{
        return await this.roleRepository.delete
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
    async getRolesByShowroom (showroomId: number): Promise<Role[]>{
        return await this.roleRepository.findBy({showroom:{showroom_id:showroomId}});
    }
    async updateRoleById (roleId: number,roleName: string): Promise<Role>{
        const role = await this.roleRepository.findOneBy({role_id:roleId});
        role.role_name = roleName;
        return await this.roleRepository.save(role);
    }

}
