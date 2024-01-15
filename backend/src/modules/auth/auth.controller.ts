import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { User } from './entities/User';
import { ValidateUserDto } from './dto/validate-user.dto';
import { User } from './entity/User';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Showroom } from '../showroom/entity/Showroom';
import { userInfo } from 'os';
import { GetUserDto } from './dto/get-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('createUser')
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);
    return this.authService.createUser(createUserDto);
  }

  @Post('signUp')
  signup(@Body(ValidationPipe) createAdminDto :CreateAdminDto): Promise <User> {
    // console.log(createAdminDto);
    return this.authService.signup(createAdminDto);
  }

  @Post('login')
  login(@Body(ValidationPipe) validationUserDto: ValidateUserDto): Promise<{ accessToken: string, showroom: number }> {
    // console.log(validationUserDto);
    return this.authService.login(validationUserDto);
  } 

  @Get('getUsers/:showroomId')
  getUsers(@Param('showroomId') showroomId: number): Promise<GetUserDto[]>{
    return this.authService.getUsers(showroomId);
  }
}
