import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { VehicleTypeAttribute } from "../vehicle-type-attribute/Vehicle-type-attribute";
import { Inventory } from "../inventory/Inventory";

@Entity({ name: 'Vehicle_Type' })
export class VehicleType{

    @PrimaryGeneratedColumn()
    type_id: number;

    @Column()
    type_name: string;

    @OneToMany(() => VehicleTypeAttribute, (vehicleTypeAttribute) => vehicleTypeAttribute.vehicleType)
    vehicleTypeAttributes: VehicleTypeAttribute[];
    
    @OneToMany(() => Inventory, (inventory) => inventory.vehicleType)
    inventory: Inventory[];
}