import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AccountType } from "../account-type.enum";
import { AccountCategory } from "../account-category.enum";
import { Inventory } from "src/modules/inventory/entity/Inventory";
import { Transaction } from "src/modules/transcation/entity/Transcation";
import { Showroom } from "src/modules/showroom/entity/Showroom";
import { Employee } from "src/modules/employee/entity/Employee";
import { CustomerAndInvestor } from "src/modules/customer/entity/CustomerAndInvestor";


@Entity({name: 'account'})
export class Account{

    @PrimaryGeneratedColumn()
    account_id: number;

    @Column()
    account_name: string;

    @Column()
    account_type:AccountType;

    @Column()
    account_category:AccountCategory;

    @Column()
    account_creation_date: Date;

    @Column()
    current_balance: number;

    @OneToOne( () => Inventory, (inventory) => inventory.account)
    inventory : Inventory;

    @OneToOne( () => CustomerAndInvestor, (customer) => customer.account)
    customer : CustomerAndInvestor;

    // @OneToOne( () => Investor, (invesetor) => invesetor.account)
    // investor : Investor;

    @OneToMany(() => Transaction, (transaction) =>  transaction.account)
    transactions:Transaction[];

    @OneToOne( () => Employee, (employee) => employee.account)
    employee : Employee;

    @ManyToOne(() => Showroom, (showroom) => showroom.accounts)
    showroom: Showroom;


   





    






}