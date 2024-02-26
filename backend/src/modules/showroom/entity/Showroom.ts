import { User } from "src/modules/auth/entity/User";
import { Inventory } from "src/modules/inventory/entity/Inventory";
import { VehicleType } from "src/modules/vehicle-type/entity/Vehicle-type";
import { Notification } from "src/modules/notification/entity/Notification";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Investor } from "src/modules/investor/entity/Investor";
import { Customer } from "src/modules/customer/entity/Customer";


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

    @OneToMany(() => Inventory, (inventory) => inventory.showroom)
    inventories: Inventory[];

    @OneToMany(() => Notification, (notification)  => notification.senderShowroom)
    senderNotification: Notification[];

    // @OneToMany(() => Notification, (notification)  => notification.senderShowroom)
    // receiverNotification: Notification[];
    @OneToMany(() => Investor, (investor) => investor.showroom)
    investors: Investor[];


    @OneToMany(() => Customer, (customer) => customer.showroom)
    customers: Customer[];

}