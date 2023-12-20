import { Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToOne } from "typeorm";
import { VehicleType } from "../../vehicle-type/entity/Vehicle-type";
import { StockAttributeValue } from "../../stock-attribute-value/entity/Stock-attribute-value";
import { InventoryStatus } from "../inventory-status.enum";
import { Showroom } from "src/modules/showroom/entity/Showroom";

@Entity({ name: 'inventory' })
export class Inventory {

@PrimaryGeneratedColumn()
inventory_id: number;

@Column()
make: string;

@Column()
model: string;

@Column()
variant: string;

@Column()
year: number;

@Column({ nullable: true})
chasis_no: string;

@Column()
price: number;

@Column()
demand: number;

@Column()
date_of_purchase: Date;

@Column({ nullable: true })
date_of_sale: Date;

@Column({ type:"enum", enum: InventoryStatus, default: InventoryStatus.AVAILABLE })
status: InventoryStatus;

@Column()
color: string;

@Column()
engine_no: string;

@Column()
comments: string;

@Column('decimal', { precision: 4, scale: 1 } )
grade: number;

@Column({ nullable: true })
reg_no: string;

@ManyToOne(() => VehicleType, (vehicleType) => vehicleType.inventory)
vehicleType: VehicleType;

@OneToMany(() => StockAttributeValue, (stockAttributeValue) => stockAttributeValue.inventory)
stockAttributeValue: StockAttributeValue[];

@ManyToOne(() => Showroom, (showroom) => showroom.inventories)
showroom: Showroom;

}