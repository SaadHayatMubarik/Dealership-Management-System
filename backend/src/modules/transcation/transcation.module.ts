import { Module } from '@nestjs/common';

import { Transaction } from './entity/Transcation';
import { Account } from '../account/entity/Account';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([Transaction, Account])
    ]
})
export class TranscationModule {}
