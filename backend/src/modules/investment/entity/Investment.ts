import { Inventory } from "src/modules/inventory/entity/Inventory";
import { Investor } from "src/modules/investor/entity/Investor";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'investment' })
export class Investment{

@PrimaryGeneratedColumn()
investement_id: number;

@Column('decimal', { precision: 4, scale: 1 } )
investment_percentage: number;

@Column()
investment_date: Date;

@ManyToOne(() => Investor, (investor) => investor.investments)
investor: Investor;

@ManyToOne(() => Inventory, (inventory) => inventory.investments)
inventory: Inventory;

}