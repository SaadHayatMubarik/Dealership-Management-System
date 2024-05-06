import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission';
import { Role } from './entities/Role';
import { Component } from './entities/component';
import { RoleBasedController } from './role-based.controller';
import { RoleBasedService } from './role-based.service';
import { User } from '../auth/entity/User';
import { RolePermission } from './entities/Role-Permission';

@Module({
    imports: [TypeOrmModule.forFeature([Permission,Role,Component,User,RolePermission])],
    controllers: [RoleBasedController],
    providers: [RoleBasedService]
})
export class RoleBasedModule {}
