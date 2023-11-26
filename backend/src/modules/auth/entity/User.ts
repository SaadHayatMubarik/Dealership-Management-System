import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserRole } from "../user-role.enum";
import * as bcrypt from 'bcrypt';
import { Showroom } from "src/modules/showroom/entity/Showroom";

@Entity({ name: 'user' })
@Unique(['user_name'])
export class User {

    @PrimaryGeneratedColumn()
    user_id: number;

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

    @ManyToOne(() => Showroom, (showroom) => showroom.users)
    showroom: Showroom;
    
    async validatePassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
    async validateUserRole(role: string): Promise<boolean>{
        let userType = false;
        // const roles = this.role;
        if (role == UserRole.ADMIN || UserRole.OWNER || UserRole.EMPLOYEE){
             userType = true;
        }
        return userType;
    }
}


