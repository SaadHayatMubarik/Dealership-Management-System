import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, JoinColumn } from "typeorm";
import { Inventory } from "../../inventory/entity/Inventory";
import { VehicleTypeAttribute } from "src/modules/vehicle-type-attribute/entity/Vehicle-type-attribute";
import { Showroom } from "src/modules/showroom/entity/Showroom";
import { MultiValueAttribute } from "src/modules/multi-value-attribute/entity/Multi-value-attribute";

@Entity({ name: 'Vehicle_Type' })
export class VehicleType{

    @PrimaryGeneratedColumn()
    type_id: number;

    @Column()
    type_name: string;

    @OneToMany(() => VehicleTypeAttribute, (vehicleTypeAttribute) => vehicleTypeAttribute.vehicleType)
    vehicleTypeAttribute: VehicleTypeAttribute[];
    
    @OneToMany(() => Inventory, (inventory) => inventory.vehicleType)
    inventory: Inventory[];

    @ManyToOne(() => Showroom, (showroom) => showroom.vehicleTypes)
    showroom: Showroom;
}