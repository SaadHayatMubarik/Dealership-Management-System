import { Inventory } from "src/modules/inventory/entity/Inventory";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Url } from "url";

@Entity({ name: 'picture' })
export class Picture{

@PrimaryGeneratedColumn()
picture_id: number;

@Column()
link: string;

@ManyToOne(() => Inventory, (inventory) => inventory.pictures)
inventory: Inventory;
}