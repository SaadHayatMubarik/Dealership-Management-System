import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission';
import { Role } from './entities/Role';
import { Component } from './entities/component';
import { RoleBasedController } from './role-based.controller';
import { RoleBasedService } from './role-based.service';
import { User } from '../auth/entity/User';
import { RolePermission } from './entities/Role-Permission';
import { Showroom } from '../showroom/entity/Showroom';

@Module({
    imports: [TypeOrmModule.forFeature([Permission,Role,Component,User,RolePermission,Showroom])],
    controllers: [RoleBasedController],
    providers: [RoleBasedService]
})
export class RoleBasedModule {}
