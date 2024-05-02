import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserRole } from "../user-role.enum";
import * as bcrypt from 'bcrypt';
import { Showroom } from "src/modules/showroom/entity/Showroom";
import { Employee } from "src/modules/employee/entity/Employee";
import { Role } from "src/modules/role-based/entities/Role";


@Entity({ name: 'user' })
@Unique(['user_name', 'email'])
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

    // @Column({ type:"enum", enum: UserRole, default: UserRole.SalesEmployee })
    // role: UserRole;

    @ManyToOne(() => Showroom, (showroom) => showroom.users)
    showroom: Showroom;

    // @OneToOne(() => Role, (role) => role)
    // role: Role;
    
    async validatePassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
    // async validateUserRole(role: string): Promise<boolean>{
    //     let userType = false;
    //     // const roles = this.role;
    //     if (role == UserRole.Admin || UserRole.InventoryEmployee || UserRole.SalesEmployee){
    //          userType = true;
    //     }
    //     return userType;
    // }
    async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
      }

    //   @OneToOne( () =>  Account, (account) =>  account.user)
    //   account : Account

    @OneToOne(() => Employee, (employee) => employee.user)
    employee: Employee;

    @ManyToOne(() => Role, (role) => role.users)
    role: Role;
}


