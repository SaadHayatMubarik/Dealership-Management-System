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
phone: string;

@Column({ default: '0' })
capital_amount: number;

@Column({ default: '0' })
profit: number;

// @ManyToOne(() => Showroom, (showroom) => showroom.investors)
// showroom: Showroom;

@OneToMany(() => Investment, (investment) => investment.investor)
investments:  Investment[];

@ManyToOne(() => Showroom, (showroom) => showroom.investors)
showroom: Showroom;
}