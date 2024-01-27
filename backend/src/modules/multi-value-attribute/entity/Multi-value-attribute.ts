import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
// import { VehicleType } from "./Vehicle-type";
import { VehicleTypeAttribute } from "../../vehicle-type-attribute/entity/Vehicle-type-attribute";
import { StockAttributeValue } from "../../stock-attribute-value/entity/Stock-attribute-value";
import { VehicleType } from "src/modules/vehicle-type/entity/Vehicle-type";

@Entity({ name: 'Multi_Value_Attribute' })
export class MultiValueAttribute{

    @PrimaryGeneratedColumn()
    multi_value_id: number;

    @Column({ nullable: true })
    attribute_value: string;


    @ManyToOne(() => VehicleTypeAttribute, (vehicleTypeAttribute) => vehicleTypeAttribute.multiValueAttributes)
    vehicleTypeAttribute: VehicleTypeAttribute;

    // @OneToMany(() => StockAttributeValue, (stockAttributeValue) => stockAttributeValue.multiValueAttribute)
    // stockAttributeValue: StockAttributeValue[];
}