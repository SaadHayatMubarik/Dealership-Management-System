import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'expense'})
export class Expense{
    @PrimaryGeneratedColumn()
    expense_id: number;

    @Column()
    
}