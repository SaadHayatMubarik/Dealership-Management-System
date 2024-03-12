import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CustomerType } from "../customer-type.enum";
import { CustomerCatagory } from "../customer-catagory.enum";
import { Inventory } from "src/modules/inventory/entity/Inventory";
import { Showroom } from "src/modules/showroom/entity/Showroom";

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

    @Column({ unique:true })
    cnic: string;

    @Column({ unique:true })
    phoneNo: string;

    @Column({ unique:true })
    email: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    province: string;
    
    @OneToMany(() => Inventory, (inventory) => inventory.customer)
    inventories: Inventory[];

    @ManyToOne(() => Showroom, (showroom) => showroom.customers)
    showroom: Showroom;

}