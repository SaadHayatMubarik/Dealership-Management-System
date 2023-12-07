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
import { TokenExpirationInterceptor } from './token.expiration.interceptor';
// import { TokenExpirationInterceptor } from 'src/token.expiration.interceptor';
// import { Showroom } from '../showroom/entity/Showroom';

@Module({
    imports:[
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
        secret: 'topSecret21',
        signOptions: {
          expiresIn: 3600, //expire in 1 hour
        },
      }),
        TypeOrmModule.forFeature([User,Showroom])
    ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TokenExpirationInterceptor,
    // }
  ],
  exports:[
    JwtStrategy,
    PassportModule,
  ],
})
export class AuthModule {}
