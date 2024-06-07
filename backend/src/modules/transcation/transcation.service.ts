import { Injectable } from '@nestjs/common';
import { Transaction } from './entity/Transcation';
import { TransactionType } from './transaction-type.enum';
import { Account } from '../account/entity/Account';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class TranscationService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
        private entityManager: EntityManager
    ){}

    async createTransaction(description: string, transactionAmount: number, transactionType: TransactionType, accountObj: Account): Promise<Transaction>{
        return await this.entityManager.transaction(async transactionalEntityManager => {
        const transaction = new Transaction();
        transaction.Transaction_date = new Date();
        transaction.description = description;
        transaction.transaction_amount = transactionAmount;
        transaction.transaction_type = transactionType;
        transaction.account = accountObj;
        return await transactionalEntityManager.save(Transaction,transaction);
        });
        
    }
}
