import { User } from "src/modules/auth/entity/User";
import { VehicleType } from "src/modules/vehicle-type/entity/Vehicle-type";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Showroom' })
export class Showroom {
    @PrimaryGeneratedColumn()
    showroom_id: number;

    @Column({ unique: true })
    showroom_name: string;

    @Column()
    address: string;
    
    @Column()
    city: string;

    @Column()
    state: string;

    @Column({ unique: true })
    contact_no: string;

    @OneToMany(() => User, (user) => user.showroom)
    users: User[];

    @OneToMany(() => VehicleType, (vehicleType) => vehicleType.showroom)
    vehicleTypes: VehicleType[];
}