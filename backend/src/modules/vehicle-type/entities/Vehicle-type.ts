import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinTable } from "typeorm";
import { VehicleTypeAttribute } from "../../vehicle-type-attribute/entities/Vehicle-type-attribute";
import { Inventory } from "../../inventory/entities/Inventory";

@Entity({ name: 'Vehicle_Type' })
export class VehicleType{

    @PrimaryGeneratedColumn()
    type_id: number;

    @Column()
    type_name: string;

    @JoinTable()
    @OneToMany(() => VehicleTypeAttribute, (vehicleTypeAttribute) => vehicleTypeAttribute.vehicleType)
    vehicleTypeAttributes: VehicleTypeAttribute[];
    
    @OneToMany(() => Inventory, (inventory) => inventory.vehicleType)
    inventory: Inventory[];
}