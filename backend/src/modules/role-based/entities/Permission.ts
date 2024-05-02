import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Component } from "./component";
import { Role } from "./Role";
import { ActionType } from "../action-type.enum";
import { RolePermission } from "./Role-Permission";
// import { Component } from "./component";

@Entity({ name: 'permission' })
export class Permission{
    @PrimaryGeneratedColumn()
    permission_id: number;

    @Column()
    permission_name: string;

    @Column({ type:"enum", enum: ActionType})
    action_type: ActionType;

    @ManyToOne(() => Component, (component) => component.permissions)
    component: Component;

    @ManyToMany(() => RolePermission, (rolePermission) => rolePermission.permission)
    rolePermissions: RolePermission[];
}