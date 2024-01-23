import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Inventory } from "../../inventory/entity/Inventory";
import { MultiValueAttribute } from "../../multi-value-attribute/entity/Multi-value-attribute";
import { VehicleTypeAttribute } from "src/modules/vehicle-type-attribute/entity/Vehicle-type-attribute";

@Entity({ name: 'Stock_Attribute_Value' })
export class StockAttributeValue{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    value: string;

    @ManyToOne(() => Inventory, (inventory) => inventory.stockAttributeValue,{cascade:true})
    inventory: Inventory;

    @ManyToOne(() => MultiValueAttribute, (multiValueAttribute) => multiValueAttribute.stockAttributeValue,{cascade:true})
    multiValueAttribute: MultiValueAttribute;

    @ManyToOne(() => VehicleTypeAttribute, (vehicleTypeAttribute) => vehicleTypeAttribute.stockAttributeValue)
    vehicleTypeAttribute: VehicleTypeAttribute;
}