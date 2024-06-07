import { Module } from '@nestjs/common';

import { Transaction } from './entity/Transcation';
import { Account } from '../account/entity/Account';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranscationController } from './transcation.controller';
import { TranscationService } from './transcation.service';
import { Showroom } from '../showroom/entity/Showroom';

@Module({
    imports: [
        TypeOrmModule.forFeature([Transaction, Account,Showroom])
    ],
    controllers:[TranscationController],
    providers:[TranscationService]

})
export class TranscationModule {}
