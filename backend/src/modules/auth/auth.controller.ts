import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/User';
import { ValidateUserDto } from './dto/validate-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);
    return this.authService.signUp(createUserDto);
  }

  @Post('login')
  login(@Body(ValidationPipe) validationUserDto: ValidateUserDto): Promise<{ accessToken: string }> {
    return this.authService.login(validationUserDto);
  } 



  // @Get('/:username')
  // getUser(@Param('username') username: string): Promise<User> {
  //   return this.authService.loginById(username);
  // }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
//     return this.authService.update(+id, updateAuthDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.authService.remove(+id);
//   }
}
