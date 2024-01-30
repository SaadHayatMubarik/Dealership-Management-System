import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entity/Notification';
import { Showroom } from '../showroom/entity/Showroom';
import { Inventory } from '../inventory/entity/Inventory';

@Module({
  imports:[
    TypeOrmModule.forFeature([Notification,Showroom,Inventory])
  ],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
