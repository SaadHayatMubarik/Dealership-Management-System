import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entity/Notification';
import { Showroom } from '../showroom/entity/Showroom';

@Module({
  imports:[
    TypeOrmModule.forFeature([Notification])
  ],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
