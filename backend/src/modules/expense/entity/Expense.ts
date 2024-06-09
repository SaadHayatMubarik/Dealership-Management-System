import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'expense'})
export class Expense{
    @PrimaryGeneratedColumn()
    expense_id: number;

    @Column()
    expense_name: string;

    @Column()
    expense_amount: number;

    @Column()
    expense_date: Date;

    @Column()
    expense_description: string;
}