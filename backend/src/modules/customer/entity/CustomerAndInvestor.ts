import { Column, Entity, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomerType } from "../customer-type.enum";
import { CustomerCatagory } from "../customer-catagory.enum";
import { Inventory } from "src/modules/inventory/entity/Inventory";
import { Showroom } from "src/modules/showroom/entity/Showroom";
import { Account } from "src/modules/account/entity/Account";
import { Investment } from "src/modules/investment/entity/Investment";
import { InvestorType } from "src/modules/investor/investor-type.enum";


@Entity({ name: 'customer_investor' })
export class CustomerAndInvestor {
    @PrimaryGeneratedColumn()
    customer_and_investor_id: number;

    @Column({ type:"enum", enum:CustomerCatagory, nullable: true })
    catagory: CustomerCatagory;

    @Column()
    name: string;

    @Column({ type:"enum", enum:CustomerType, nullable: true })
    type: CustomerType;

    @Column({ nullable:true })
    cnic: string;

    @Column()
    phoneNo: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    province: string;

    @Column({ default: '0' })
    capital_amount: number;

    @Column({ default: false })
    is_investor: boolean;

    @Column({ default: false })
    is_customer: boolean;

    @Column({ type:"enum", enum:InvestorType, nullable:true })
    investor_type: InvestorType; 
    
    @OneToMany(() => Investment, (investment) => investment.investor)
    investments:  Investment[];

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