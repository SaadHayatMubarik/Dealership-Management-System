import { User } from "src/modules/auth/entity/User";
import { Inventory } from "src/modules/inventory/entity/Inventory";
import { VehicleType } from "src/modules/vehicle-type/entity/Vehicle-type";
import { Notification } from "src/modules/notification/entity/Notification";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
// import { Investor } from "src/modules/investor/entity/Investor";
// import { Customer } from "src/modules/customer/entity/Customer";
import { Account } from "src/modules/account/entity/Account";
import { Employee } from "src/modules/employee/entity/Employee";
import { Role } from "src/modules/role-based/entities/Role";
import { CustomerAndInvestor } from "src/modules/customer/entity/CustomerAndInvestor";
// import { CustomerAndInvestor } from "src/modules/customer/entity/Customer";


@Entity({ name: 'Showroom' })
export class Showroom {
    @PrimaryGeneratedColumn()
    showroom_id: number;

    @Column()
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

    @OneToMany(() => CustomerAndInvestor, (customer) => customer.showroom)
    customers: CustomerAndInvestor[];

    @OneToMany(() => Account, (account) =>  account.showroom)
    accounts : Account[] ;

    @OneToMany(() => Employee, (employee) => employee.showroom)
    employees:Employee[];

    @OneToMany(() => Role, (role) =>  role.showroom)
    roles : Role[] ;
}