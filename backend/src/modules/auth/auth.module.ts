import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './entities/User';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy';
import { User } from './entity/User';
import { Showroom } from '../showroom/entity/Showroom';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Role } from '../role-based/entities/Role';
import { Permission } from '../role-based/entities/permission';
import { RolePermission } from '../role-based/entities/Role-Permission';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret21',
      signOptions: {
        expiresIn: 3600, //expire in 1 hour
      },
    }),
    TypeOrmModule.forFeature([User, Showroom, Role, Permission, RolePermission])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports: [
    JwtStrategy,
    PassportModule,
  ],
})
export class AuthModule { }
