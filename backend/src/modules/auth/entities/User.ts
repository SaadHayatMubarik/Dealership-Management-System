import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../user-role.enum";
@Entity({ name: 'user' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ type:"enum", enum: UserRole, default: UserRole.EMPLOYEE })
    role: UserRole;
}
