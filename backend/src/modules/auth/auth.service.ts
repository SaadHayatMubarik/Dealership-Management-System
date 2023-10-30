import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/User';
import { Repository } from 'typeorm';
// import { CreateAuthDto } from './dto/create-user.dto';
// import { UpdateAuthDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}
  async signUp(createUserDto: CreateUserDto): Promise<User>{
    const { username, password, email, role } = createUserDto;
    const user = new User();
    user.user_name = username;
    user.password = password;
    user.email = email;
    user.role = role;
    return this.userRepository.save(user);
  }

  async loginById(userName: string): Promise<User>{
    return this.userRepository.findOne({where: {user_name: userName}});
  } 
}
