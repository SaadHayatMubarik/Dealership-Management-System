import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";
import { VehicleType } from "../vehicle-type/Vehicle-type";
import { MultiValueAttribute } from "../multi-value-attribute/Multi-value-attribute";
import { StockAttributeValue } from "../stock-attribute-value/Stock-attribute-value";

@Entity({ name: 'Vehicle_Type_Attribute' })
export class VehicleTypeAttribute {
     @PrimaryGeneratedColumn()
     attribute_id: number;

     @Column()
     attribute_name: string;

     @Column({ nullable: false })
     input_type: string;

     // @Column()
     // type_name: string;  

     @OneToMany(() => MultiValueAttribute, (multiValueAttribute) => multiValueAttribute.vehicleTypeAttribute)
     multiValueAttributes: MultiValueAttribute[];

     @ManyToOne(() => VehicleType, (vehicleType) => vehicleType.vehicleTypeAttributes)
     vehicleType: VehicleType;

     // @Column()
     // type_name: VehicleType;
     @OneToMany(() => StockAttributeValue, (stockAttributeValue) => stockAttributeValue.vehicleTypeAttribute)
     stockAttributeValue: StockAttributeValue[];

     
}