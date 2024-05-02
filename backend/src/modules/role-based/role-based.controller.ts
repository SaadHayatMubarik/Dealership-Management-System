import { Controller, Param, Post } from '@nestjs/common';
import { RoleBasedService } from './role-based.service';
import { Permission } from './entities/permission';
import { ActionType } from './action-type.enum';

@Controller('role-based')
export class RoleBasedController {
    constructor(
        private roleBasedService: RoleBasedService,
    ){}

    @Post('/:permissionName/:actionType/:componentId')
    addPermission(
        @Param('permissionName') permissionName: string,
        @Param('actionType') actionType:ActionType,
        @Param('componentId') componentId:number): Promise<Permission>{
            return this.roleBasedService.addPermission(permissionName,actionType,componentId);
    }
}
