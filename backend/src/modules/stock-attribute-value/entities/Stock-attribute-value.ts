import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { VehicleTypeAttribute } from "../../vehicle-type-attribute/entities/Vehicle-type-attribute";
import { Inventory } from "../../inventory/entities/Inventory";
import { MultiValueAttribute } from "../../multi-value-attribute/entities/Multi-value-attribute";

@Entity({ name: 'Stock_Attribute_Value' })
export class StockAttributeValue{

    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(() => VehicleTypeAttribute, (vehicleTypeAttribute) => vehicleTypeAttribute.stockAttributeValue,{cascade:true})
    // vehicleTypeAttribute: VehicleTypeAttribute;

    @ManyToOne(() => Inventory, (inventory) => inventory.stockAttributeValue,{cascade:true})
    inventory: Inventory;

    @ManyToOne(() => MultiValueAttribute, (multiValueAttribute) => multiValueAttribute.stockAttributeValue,{cascade:true})
    multiValueAttribute: MultiValueAttribute;
}