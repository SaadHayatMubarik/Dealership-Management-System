import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AccountType } from "../account-type.enum";
import { AccountCategory } from "../account-category.enum";
import { Inventory } from "src/modules/inventory/entity/Inventory";
import { Customer } from "src/modules/customer/entity/Customer";
import { InvestorDto } from "src/modules/investor/dto/investor.dto";
import { Investor } from "src/modules/investor/entity/Investor";
import { User } from "src/modules/auth/entity/User";


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


    @OneToOne( () => Inventory, (inventory) => inventory.account)
    inventory : Inventory;

    @OneToOne( () => Customer, (customer) => customer.account)
    customer : Customer;

    @OneToOne( () => Investor, (invesetor) => invesetor.account)
    investor : Investor;

    // @OneToOne( () => User, (user) => user.account)
    // user : User;



   





    






}