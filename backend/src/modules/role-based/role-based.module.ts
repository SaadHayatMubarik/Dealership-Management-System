import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission';
import { Role } from './entities/Role';
import { Component } from './entities/component';

@Module({
    imports: [TypeOrmModule.forFeature([Permission,Role,Component])]
})
export class RoleBasedModule {}
