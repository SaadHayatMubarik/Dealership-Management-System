import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission';
import { privateDecrypt } from 'crypto';
import { Repository } from 'typeorm';
import { ActionType } from './action-type.enum';
import { Component } from './entities/component';

@Injectable()
export class RoleBasedService {
    constructor(
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>,
        @InjectRepository(Component)
        private componentRepository: Repository<Component>
    ){}
    async addPermission (permissionName: string, actionType: ActionType ,componentId: number): Promise<Permission>{
        const permission = new Permission();
        permission.permission_name = permissionName.toLowerCase();
        permission.action_type = actionType;
        permission.component = await this.componentRepository.findOneBy({component_id:componentId});
        return await this.permissionRepository.save(permission);
    }
}
