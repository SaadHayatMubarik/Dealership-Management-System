import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { User } from './entities/User';
import { ValidateUserDto } from './dto/validate-user.dto';
import { User } from './entity/User';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Showroom } from '../showroom/entity/Showroom';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('createUser')
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {
    // console.log(createUserDto);
    return this.authService.createUser(createUserDto);
  }

  @Post('signUp')
  signup(@Body(ValidationPipe) createAdminDto :CreateAdminDto): Promise <User> {
    return this.authService.signup(createAdminDto);
  }

  @Post('login')
  login(@Body(ValidationPipe) validationUserDto: ValidateUserDto): Promise<{ accessToken: string, showroom: any }> {
    return this.authService.login(validationUserDto);
  } 

}
