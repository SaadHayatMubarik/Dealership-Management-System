import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { VehicleTypeAttribute } from "../vehicle-type-attribute/Vehicle-type-attribute";
import { Inventory } from "../inventory/Inventory";
import { MultiValueAttribute } from "../multi-value-attribute/Multi-value-attribute";

@Entity({ name: 'Stock_Attribute_Value' })
export class StockAttributeValue{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => VehicleTypeAttribute, (vehicleTypeAttribute) => vehicleTypeAttribute.stockAttributeValue)
    vehicleTypeAttribute: VehicleTypeAttribute;

    @ManyToOne(() => Inventory, (inventory) => inventory.stockAttributeValue)
    invenotry: Inventory;

    @ManyToOne(() => MultiValueAttribute, (multiValueAttribute) => multiValueAttribute.stockAttributeValue)
    multiValueAttribute: MultiValueAttribute;
}