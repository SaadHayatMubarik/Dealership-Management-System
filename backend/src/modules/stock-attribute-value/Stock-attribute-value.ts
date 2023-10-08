import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { VehicleTypeAttribute } from "../vehicle-type-attribute/Vehicle-type-attribute";
import { Inventory } from "../inventory/Inventory";

@Entity({ name: 'Stock_Attribute_Value' })
export class StockAttributeValue{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    inventory_id: number;

    @Column()
    attribute_name: string;

    @Column()
    attribute_value: string;

    @ManyToOne(() => VehicleTypeAttribute, (vehicleTypeAttribute) => vehicleTypeAttribute.stockAttributeValue)
    vehicleTypeAttribute: VehicleTypeAttribute;

    @ManyToOne(() => Inventory, (inventory) => inventory.stockAttributeValue)
    invenotry: Inventory;
    
}