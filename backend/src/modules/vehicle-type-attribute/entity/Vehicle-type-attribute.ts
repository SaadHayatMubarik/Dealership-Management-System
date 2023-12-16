import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, JoinTable} from "typeorm";
import { VehicleType } from "../../vehicle-type/entity/Vehicle-type";
import { MultiValueAttribute } from "../../multi-value-attribute/entity/Multi-value-attribute";
import { StockAttributeValue } from "../../stock-attribute-value/entity/Stock-attribute-value";

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
     // @JoinTable()
     multiValueAttributes: MultiValueAttribute[];

     @ManyToOne(() => VehicleType, (vehicleType) => vehicleType.vehicleTypeAttribute)
     vehicleType: VehicleType;

     // @Column()
     // type_name: VehicleType;
     // @OneToMany(() => StockAttributeValue, (stockAttributeValue) => stockAttributeValue.vehicleTypeAttribute,{
     //      onDelete: 'CASCADE',
     //      onUpdate: 'CASCADE'
     //  })
     // stockAttributeValue: StockAttributeValue[];

     
}