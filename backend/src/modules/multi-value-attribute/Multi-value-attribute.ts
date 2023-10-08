import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
// import { VehicleType } from "./Vehicle-type";
import { VehicleTypeAttribute } from "../vehicle-type-attribute/Vehicle-type-attribute";

@Entity({ name: 'Multi_Value_Attribute' })
export class MultiValueAttribute{

    @PrimaryGeneratedColumn()
    multi_value_id: number;

    @Column()
    attribute_value: string;

    @Column()
    attribute_name: string;

    @ManyToOne(() => VehicleTypeAttribute, (vehicleTypeAttribute) => vehicleTypeAttribute.multiValueAttributes)
    vehicleTypeAttribute: VehicleTypeAttribute;

}