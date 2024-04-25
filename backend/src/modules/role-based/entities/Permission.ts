import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Component } from "./component";
import { Role } from "./Role";
import { ActionType } from "../action-type.enum";
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

    @OneToOne(() => Role, (role) => role.permissions)
    role: Role;


}