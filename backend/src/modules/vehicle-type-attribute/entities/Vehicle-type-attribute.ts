import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn} from "typeorm";
import { VehicleType } from "../../vehicle-type/entities/Vehicle-type";
import { MultiValueAttribute } from "../../multi-value-attribute/entities/Multi-value-attribute";
import { StockAttributeValue } from "../../stock-attribute-value/entities/Stock-attribute-value";

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
     @JoinColumn()
     multiValueAttributes: MultiValueAttribute[];

     @ManyToOne(() => VehicleType, (vehicleType) => vehicleType.vehicleTypeAttributes, {cascade:true})
     vehicleType: VehicleType;

     // @Column()
     // type_name: VehicleType;
     @OneToMany(() => StockAttributeValue, (stockAttributeValue) => stockAttributeValue.vehicleTypeAttribute)
     stockAttributeValue: StockAttributeValue[];

     
}