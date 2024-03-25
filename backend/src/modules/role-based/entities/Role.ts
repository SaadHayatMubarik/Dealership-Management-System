import { User } from "src/modules/auth/entity/User";
import { Showroom } from "src/modules/showroom/entity/Showroom";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permission";

@Entity({ name: 'role' })
export class Role {
    @PrimaryGeneratedColumn()
    role_id: number;

    @Column()
    role_name: string;

    @ManyToOne(() => Showroom, (showroom) => showroom.roles)
    showroom: Showroom;

    @OneToMany(() => User, (user) => user.role_id)
    users: User[]; 

    @OneToOne(() => Permission, (permission) => permission.role)
    permissions: Permission;
}