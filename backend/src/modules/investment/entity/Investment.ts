// import { CustomerAndInvestor } from "src/modules/customer/entity/Customer";
import { CustomerAndInvestor } from "src/modules/customer/entity/CustomerAndInvestor";
import { Inventory } from "src/modules/inventory/entity/Inventory";
// import { Investor } from "src/modules/investor/entity/Investor";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'investment' })
export class Investment{

@PrimaryGeneratedColumn()
investement_id: number;

@Column()
investment_amount: number;

@Column()
investment_date: Date;

@Column({ default: '0' })
profit: number;

@ManyToOne(() => CustomerAndInvestor, (investor) => investor.investments)
investor: CustomerAndInvestor;

@ManyToOne(() => Inventory, (inventory) => inventory.investments)
inventory: Inventory;

}