import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Component } from "./component";
import { Role } from "./Role";
// import { Component } from "./component";

@Entity({ name: 'permission' })
export class Permission{
    @PrimaryGeneratedColumn()
    permission_id: number;

    @Column()
    add_permission: boolean;

    @Column()
    view_permission: boolean;

    @Column()
    update_permission: boolean;

    @Column()
    delete_permission: boolean;

    @ManyToOne(() => Component, (component) => component.permissions)
    component: Component;

    @OneToOne(() => Role, (role) => role.permissions)
    role: Role;


}