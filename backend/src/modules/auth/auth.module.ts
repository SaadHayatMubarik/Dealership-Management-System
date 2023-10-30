import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports:[
      JwtModule.register({
        secret: 'topSecret21',
        signOptions: {
          expiresIn: 3600, //expire in 1 hour
        },
      }),
        TypeOrmModule.forFeature([User])
    ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
