import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinTable } from "typeorm";
import { VehicleTypeAttribute } from "../vehicle-type-attribute/Vehicle-type-attribute";
import { Inventory } from "../inventory/Inventory";

@Entity({ name: 'Vehicle_Type' })
export class VehicleType{

    @PrimaryGeneratedColumn()
    type_id: number;

    @Column()
    type_name: string;

    @JoinTable()
    @OneToMany(() => VehicleTypeAttribute, (vehicleTypeAttribute) => vehicleTypeAttribute.vehicleType, {cascade:true})
    vehicleTypeAttributes: VehicleTypeAttribute[];
    
    @OneToMany(() => Inventory, (inventory) => inventory.vehicleType)
    inventory: Inventory[];
}