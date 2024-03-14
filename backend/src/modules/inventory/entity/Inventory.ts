import { Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { VehicleType } from "../../vehicle-type/entity/Vehicle-type";
import { StockAttributeValue } from "../../stock-attribute-value/entity/Stock-attribute-value";
import { InventoryStatus } from "../inventory-status.enum";
import { Showroom } from "src/modules/showroom/entity/Showroom";
import { Notification } from "src/modules/notification/entity/Notification";
import { Customer } from "src/modules/customer/entity/Customer";
import { Investment } from "src/modules/investment/entity/Investment";
import { Picture } from "src/modules/picture/entity/Picture";

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

@Column({ nullable: true })
engine_no: string;

@Column()
comments: string;

@Column('decimal', { precision: 4, scale: 1 } )
grade: number;

@Column({ nullable: true })
reg_no: string;

@Column()
mileage: number;

@ManyToOne(() => VehicleType, (vehicleType) => vehicleType.inventory)
vehicleType: VehicleType;

@OneToMany(() => StockAttributeValue, (stockAttributeValue) => stockAttributeValue.inventory)
stockAttributeValue: StockAttributeValue[];

@ManyToOne(() => Showroom, (showroom) => showroom.inventories)
showroom: Showroom;

@OneToOne(() => Notification, (notification) => notification)
notifications: Notification;

@ManyToOne(() => Customer, (customer) => customer.sellerInventories)
// @JoinTable()
seller: Customer;

@ManyToOne(() => Customer, (customer) => customer.buyerInventories)
buyer: Customer;

@OneToMany(() => Investment, (investment) => investment.inventory)
investments: Investment[];

@OneToMany(() => Picture, (picture) => picture.inventory)
pictures: Picture[];
}