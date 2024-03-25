import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permission";

@Entity({ name: 'component' })
export class Component {

    @PrimaryGeneratedColumn()
    component_id: number;

    @Column()
    component_name: string;

    @OneToMany(() => Permission, (permission) => permission.component)
    permissions: Permission[];
}