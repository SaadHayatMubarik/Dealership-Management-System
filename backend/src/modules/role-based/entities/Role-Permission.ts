import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";
import { Permission } from "./permission";

@Entity({ name: 'role_permission' })
export class RolePermission {
    @PrimaryGeneratedColumn()
    role_Permission_id: number;
    
    @ManyToOne(() => Role, (role) => role.rolePermissions)
    role: Role;

    @ManyToOne(() => Permission, (permission) => permission)
    permission: Permission;
}