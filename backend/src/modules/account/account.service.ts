import { Injectable } from '@nestjs/common';
// import { Account } from './entity/Account';
import { AccountType } from './account-type.enum';
import { AccountCategory } from './account-category.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Showroom } from '../showroom/entity/Showroom';
import { EntityManager, Repository } from 'typeorm';
import { Account } from './entity/Account';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Showroom)
        private showroomRepository: Repository<Showroom>,
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
        private entityManager: EntityManager
    ){}


    async createAccount(accountName: string, accountType:AccountType, accountCategory: AccountCategory, price: number, showroomId: number): Promise<Account>{
        return await this.entityManager.transaction(async transactionalEntityManager => {
        const account = new Account();
                account.account_name = accountName;
                account.account_type = accountType;
                account.account_category = accountCategory;
                account.account_creation_date = new Date();
                account.current_balance = price;
                account.showroom = await transactionalEntityManager.findOneBy(Showroom,{ showroom_id: showroomId });
        return await transactionalEntityManager.save(Account,account);
        });
    }
}
