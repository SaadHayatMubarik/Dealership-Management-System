import { User } from "src/modules/auth/entity/User";
import { Showroom } from "src/modules/showroom/entity/Showroom";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permission";
import { RolePermission } from "./Role-Permission";

@Entity({ name: 'role' })
export class Role {
    @PrimaryGeneratedColumn()
    role_id: number;

    @Column()
    role_name: string;

    @ManyToOne(() => Showroom, (showroom) => showroom.roles)
    showroom: Showroom;

    @OneToMany(() => User, (user) => user.role)
    users: User[]; 

    @ManyToMany(() => RolePermission, (rolePermission) => rolePermission.role)
    rolePermissions: RolePermission[];
}