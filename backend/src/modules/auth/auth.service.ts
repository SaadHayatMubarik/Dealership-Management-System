import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/User';
import { Repository } from 'typeorm';
import { ValidateUserDto } from './dto/validate-user.dto';
// import { CreateAuthDto } from './dto/create-user.dto';
// import { UpdateAuthDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}
  async signUp(createUserDto: CreateUserDto): Promise<User>{
    const { userName, password, email, role } = createUserDto;

    // const salt = 
    // console.log(salt);
    const user = new User();
    user.user_name = userName;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password,user.salt);
    // console.log(user.password);
    user.email = email;
    user.role = role;
    
    try{
      return  await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505'){
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException()
      }
    }
    
    
  }

  async login( validateUserDto: ValidateUserDto){
    const username = await this.validateUserPassword(validateUserDto);

    if(!username){
      throw new UnauthorizedException('Invalidate credentials');
    }
  } 

  private async hashPassword(password: string, salt: string): Promise<string>{
    return bcrypt.hash(password,salt);
  }

  private async validateUserPassword( validateUserDto: ValidateUserDto ): Promise<string>{
  const { username, Password } = validateUserDto
  const user = await this.userRepository.findOne({where: { user_name: username }});
  if (user && await user.validatePassword(Password)) {
    return user.user_name;
  }
  else {
    return null;
  }

  }
}
