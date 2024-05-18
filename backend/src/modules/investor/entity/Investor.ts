
import { Account } from "src/modules/account/entity/Account";
import { Investment } from "src/modules/investment/entity/Investment";
import { Showroom } from "src/modules/showroom/entity/Showroom";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'investor' })
export class Investor{

@PrimaryGeneratedColumn()
investor_id: number;

@Column()
investor_name:  string;

@Column({ unique:true })
cnic: string;

@Column({ unique: true})
phone: string;



// @ManyToOne(() => Showroom, (showroom) => showroom.investors)
// showroom: Showroom;



// @ManyToOne(() => Showroom, (showroom) => showroom.investors)
// showroom: Showroom;




}