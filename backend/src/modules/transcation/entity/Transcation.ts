import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TransactionType } from "../transaction-type.enum";
import { Account } from "src/modules/account/entity/Account";


@Entity({ name: 'transaction' })
export class Transaction {

    @PrimaryGeneratedColumn()
    transaction_id: number;

    @Column()
    Transaction_date: Date;

    @Column()
    description: string;

    @Column()
    transaction_amount: number;

    @Column()
    transaction_type: TransactionType;

    @ManyToOne(() => Account, (account) => account.transactions)
    account: Account;
}