import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidateUserDto } from './dto/validate-user.dto';
import { User } from './entity/User';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Showroom } from '../showroom/entity/Showroom';
import { userInfo } from 'os';
import { GetUserDto } from './dto/get-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from './user-role.enum';


@Controller('auth')

export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard())
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
  login(@Body(ValidationPipe) validationUserDto: ValidateUserDto): Promise<{ accessToken: string, showroom: number, role:UserRole }> {
    // console.log(validationUserDto);
    return this.authService.login(validationUserDto);
  } 

  @UseGuards(AuthGuard())
  @Get('getUsers/:showroomId')
  getUsers(@Param('showroomId') showroomId: number): Promise<GetUserDto[]>{
    return this.authService.getUsers(showroomId);
  }
  @Delete('deleteUser/:userId')
  deleteUser(@Param('userId') userId: number){
    return this.authService.deleteUser(userId);
  }
}
