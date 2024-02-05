import { Investment } from "src/modules/investment/entity/Investment";
import { Showroom } from "src/modules/showroom/entity/Showroom";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'investor' })
export class Investor{

@PrimaryGeneratedColumn()
investor_id: number;

@Column()
investor_name:  string;

@Column()
cnic: string;

@Column()
capital_amount: string;

@Column()
profit: string;

@OneToMany(() => Investment, (investment) => investment.investor)
investments:  Investment[];

@ManyToOne(() => Showroom, (showroom) => showroom.investors)
showroom: Showroom;
}