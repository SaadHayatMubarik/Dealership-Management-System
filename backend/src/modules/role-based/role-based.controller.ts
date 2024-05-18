import { Body, Controller, Get, Param, ParseEnumPipe, Post } from '@nestjs/common';
import { RoleBasedService } from './role-based.service';
import { Permission } from './entities/permission';
import { ActionType } from './action-type.enum';
import { Component } from './entities/component';
import { RolePermission } from './entities/Role-Permission';
import { AddRolePermissionDto } from './dto/addRolePermission.dto';
import { Role } from './entities/Role';

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

    @Post('addRolePermission')
    addRolePermission(@Body() addRolePermissionDto: AddRolePermissionDto): Promise<RolePermission[]>{
        console.log('result', addRolePermissionDto);
        return this.roleBasedService.addRolePermission(addRolePermissionDto);
    }

    @Get('permissionAndComponent')
    getComponent(): Promise<Component[]>{
        return this.roleBasedService.getComponent();
    }

    @Get('componentViaRole/:userId')
    getComponentViaRole(@Param('userId') userId: number): Promise<Component[]>{
        return this.roleBasedService.getComponentViaRole(userId);
    }

    @Get('getRole/:showroomId')
    getRole(@Param('showroomId') showroomId: number): Promise<Role[]>{
        return this.roleBasedService.getRolesByShowroom(showroomId);
    }
}
