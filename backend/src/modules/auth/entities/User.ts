import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserRole } from "../user-role.enum";
import * as bcrypt from 'bcrypt';
@Entity({ name: 'user' })
@Unique(['user_name'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column({ type:"enum", enum: UserRole, default: UserRole.EMPLOYEE })
    role: UserRole;

    async validatePassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}
