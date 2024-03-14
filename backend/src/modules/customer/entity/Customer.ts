import { Column, Entity, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomerType } from "../customer-type.enum";
import { CustomerCatagory } from "../customer-catagory.enum";
import { Inventory } from "src/modules/inventory/entity/Inventory";
import { Showroom } from "src/modules/showroom/entity/Showroom";
import { Account } from "src/modules/account/entity/Accounts";

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
    
    @OneToMany(() => Inventory, (inventory) => inventory.seller)
    // @JoinTable()
    sellerInventories: Inventory[];

    @OneToMany(() => Inventory, (inventory) => inventory.buyer)
    // @JoinTable()
    buyerInventories: Inventory[];

    @ManyToOne(() => Showroom, (showroom) => showroom.customers)
    showroom: Showroom;

    @OneToOne(() => Account, (account) => account.customer)
    account: Account;
}