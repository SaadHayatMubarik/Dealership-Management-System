import { Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from "typeorm";
import { VehicleType } from "../../vehicle-type/entities/Vehicle-type";
import { StockAttributeValue } from "../../stock-attribute-value/entities/Stock-attribute-value";
import { InventoryStatus } from "../inventory-status.enum";


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
date_of_purchase: string;

@Column({ nullable: true })
date_sold: string;

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

// @Column()
// vehicle_type_id: VehicleType;
@OneToOne(() => VehicleType, (vehicleType) => vehicleType.inventory)
vehicleType: VehicleType;

@OneToMany(() => StockAttributeValue, (stockAttributeValue) => stockAttributeValue.inventory, { cascade: true } )
stockAttributeValue: StockAttributeValue[];
}