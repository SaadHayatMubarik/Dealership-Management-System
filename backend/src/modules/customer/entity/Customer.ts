import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CustomerType } from "../customer-type.enum";
import { CustomerCatagory } from "../customer-catagory.enum";
import { Inventory } from "src/modules/inventory/entity/Inventory";

@Entity({ name: 'customer' })
export class Customer {
    @PrimaryGeneratedColumn()
    customer_id: number;

    @Column({ type:"enum", enum:CustomerCatagory, default: CustomerCatagory.CUSTOMER })
    catagory: CustomerCatagory;

    @Column()
    name: string;

    @Column()
    type: CustomerType;

    @Column()
    cnic: number;

    @Column()
    phone_number: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    province: string;
    
    @OneToMany(() => Inventory, (inventory) => inventory)
    inventories: Inventory[];

}