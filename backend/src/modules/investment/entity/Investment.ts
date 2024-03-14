import { Inventory } from "src/modules/inventory/entity/Inventory";
import { Investor } from "src/modules/investor/entity/Investor";
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

@ManyToOne(() => Investor, (investor) => investor.investments)
investor: Investor;

@ManyToOne(() => Inventory, (inventory) => inventory.investments)
inventory: Inventory;

}