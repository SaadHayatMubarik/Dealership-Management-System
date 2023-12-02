import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
// import { User } from './entities/User';
import { Repository } from 'typeorm';
import { ValidateUserDto } from './dto/validate-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './entity/User';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Showroom } from '../showroom/entity/Showroom';
import { UserRole } from './user-role.enum';
// import { CreateAuthDto } from './dto/create-user.dto';
// import { UpdateAuthDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Showroom)
    private showroomRepository: Repository<Showroom>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ){}
  async signup(createAdminDto: CreateAdminDto): Promise<User>{
    const { username,  email, password, showroomAddress, showroomCity, showroomContactNo, showroomName, showroomState } = createAdminDto;
    const user = new User();
    const showroom = new Showroom();
    if(await this.userRepository.exist({ where: { user_name: username} })){
      throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
    }
    else{
      showroom.address = showroomAddress;
    showroom.city = showroomCity;
    showroom.contact_no = showroomContactNo;
    showroom.showroom_name = showroomName;
    showroom.state = showroomState;
    await this.showroomRepository.save(showroom);
      user.user_name = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password,user.salt);
    user.email = email;
    user.role = UserRole.ADMIN;
    user.showroom = showroom;
    return await this.userRepository.save(user);
    }
  }
  async createUser(createUserDto: CreateUserDto): Promise<User>{
    const { username, password, email, role, showroomId } = createUserDto;

    // const salt = 
    // console.log(salt);
    const user = new User();
    user.user_name = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password,user.salt);
    // console.log(user.password);
    user.email = email;
    user.role = role;
    user.showroom = await this.showroomRepository.findOne({ where: { showroom_id: showroomId } });
    
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

  async login( validateUserDto: ValidateUserDto): Promise<{ accessToken: string, showroom: number }>{
    const username = await this.validateUserPassword(validateUserDto);

    if(!username){
      throw new UnauthorizedException('Invalidate credentials');
    }
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    const showroom = await this.userRepository.createQueryBuilder('user')
    .select('showroomShowroomId') 
    .where('user.user_name = :username', {username})
    .getRawOne();                        

    console.log(showroom);
    return { accessToken, showroom };
  } 

  private async hashPassword(password: string, salt: string): Promise<string>{
    return bcrypt.hash(password,salt);
  }

  private async validateUserPassword( validateUserDto: ValidateUserDto ): Promise<string>{
  const { username, password, role } = validateUserDto
  const user = await this.userRepository.findOne({where: { user_name: username, role: role }});
  if (user && await user.validatePassword(password) && user.validateUserRole(role)) {
    return user.user_name;
  }
  else {
    return null;
  }

  }
  
}
