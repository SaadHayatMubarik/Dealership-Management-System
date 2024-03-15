import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AccountType } from "../account-type.enum";
import { AccountCategory } from "../account-category.enum";
import { Inventory } from "src/modules/inventory/entity/Inventory";
import { Customer } from "src/modules/customer/entity/Customer";
import { InvestorDto } from "src/modules/investor/dto/investor.dto";
import { Investor } from "src/modules/investor/entity/Investor";
import { User } from "src/modules/auth/entity/User";
import { Transaction } from "src/modules/transcation/entity/Transcation";
import { Showroom } from "src/modules/showroom/entity/Showroom";
import { Employee } from "src/modules/employee/entity/Employee";


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

    @OneToOne( () => Customer, (customer) => customer.account)
    customer : Customer;

    @OneToOne( () => Investor, (invesetor) => invesetor.account)
    investor : Investor;

    @OneToMany(() => Transaction, (transaction) =>  transaction.account)
    transactions:Transaction[];

    @OneToOne( () => Employee, (employee) => employee.account)
    employee : Employee;

    @ManyToOne(() => Showroom, (showroom) => showroom.accounts)
    showroom: Showroom;


   





    






}