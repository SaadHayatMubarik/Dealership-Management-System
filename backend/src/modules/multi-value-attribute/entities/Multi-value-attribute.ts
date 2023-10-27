import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
// import { VehicleType } from "./Vehicle-type";
import { VehicleTypeAttribute } from "../../vehicle-type-attribute/entities/Vehicle-type-attribute";
import { StockAttributeValue } from "../../stock-attribute-value/entities/Stock-attribute-value";

@Entity({ name: 'Multi_Value_Attribute' })
export class MultiValueAttribute{

    @PrimaryGeneratedColumn()
    multi_value_id: number;

    @Column()
    attribute_value: string;

    // @Column()
    // attribute_name: string;

    @ManyToOne(() => VehicleTypeAttribute, (vehicleTypeAttribute) => vehicleTypeAttribute.multiValueAttributes, {cascade:true})
    @JoinColumn()
    vehicleTypeAttribute: VehicleTypeAttribute;

    @OneToMany(() => StockAttributeValue, (stockAttributeValue) => stockAttributeValue.multiValueAttribute)
    stockAttributeValue: StockAttributeValue[];
}