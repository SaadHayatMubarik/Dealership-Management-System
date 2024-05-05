import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
// import { User } from './entities/User';
import { DeleteResult, Repository } from 'typeorm';
import { ValidateUserDto } from './dto/validate-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './entity/User';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Showroom } from '../showroom/entity/Showroom';
import { UserRole } from './user-role.enum';
import { GetUserDto } from './dto/get-user.dto';
import { get } from 'http';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../role-based/entities/Role';
import { Permission } from '../role-based/entities/permission';
import { RolePermission } from '../role-based/entities/Role-Permission';
import { privateDecrypt } from 'crypto';
// import { CreateAuthDto } from './dto/create-user.dto';
// import { UpdateAuthDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Showroom)
    private showroomRepository: Repository<Showroom>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Permission)
    private  permissionRepository: Repository<Permission>,
    @InjectRepository(Role)
    private  roleRepository : Repository <Role> ,
    @InjectRepository(RolePermission)
    private rolePermissionRepository : Repository <RolePermission>,
    private jwtService: JwtService,

  ){}
  async signup(createAdminDto: CreateAdminDto): Promise<User>{
    const { username,  email, password, showroomAddress, showroomCity, showroomContactNo, showroomName, showroomState } = createAdminDto;
    const user = new User();
    const showroom = new Showroom();
    if(await this.userRepository.exist({ where: { user_name: username} }) && await this.showroomRepository.exist({ where: {showroom_name:showroomName} })){
      throw new HttpException('Username or Showroom name already exists', HttpStatus.BAD_REQUEST);
    }
    else{
      showroom.address = showroomAddress;
    showroom.city = showroomCity;
    showroom.contact_no = showroomContactNo;
    showroom.showroom_name = showroomName;
    showroom.state = showroomState;
    const showroomObj = await this.showroomRepository.save(showroom);
    const showroomId = await this.showroomRepository.getId(showroomObj);

    const role = new Role();
    role.role_name = 'ADMIN';
    role.showroom = await this.showroomRepository.findOneBy({showroom_id:showroomId});
    await this.roleRepository.save(role);
    const roleId = await this.roleRepository.getId(role);
    const roleObj = await this.roleRepository.findOneBy({role_id:roleId});

    let totalPermissions = await this.permissionRepository.find();
    for(let i=0; i<totalPermissions.length; i++){
      const rolePermission = new RolePermission();
      rolePermission.role = roleObj;
      rolePermission.permission = totalPermissions[i];
      await this.rolePermissionRepository.save(rolePermission);
    }

    user.user_name = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password,user.salt);
    user.email = email;
    user.role = roleObj;
    user.showroom = role.showroom;
    return await this.userRepository.save(user);
    }
  }
  async createUser(createUserDto: CreateUserDto): Promise<User>{
    const { username, password, email, role, showroomId } = createUserDto;
    const user = new User();
    user.user_name = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password,user.salt);
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

  async changePassword(userId: number,newPassword: string, oldPassword: string){
    if (await this.userRepository.exist({where:{user_id:userId}}) == true){
      const user = await this.userRepository.findOne({where:{user_id:userId}});  
      if(await user.validatePassword(oldPassword)){
        const newSalt = await bcrypt.genSalt();
      const newHash = await this.hashPassword(newPassword,newSalt);
      
      await this.userRepository.update({user_id: userId},{salt: newSalt});
      return  await this.userRepository.update({user_id: userId},{password: newHash});
      }
      else{
        throw new ConflictException('password does not match');
      }
    }

  }


  async login( validateUserDto: ValidateUserDto): Promise<{ userId: number ,accessToken: string, showroom: number, role:string}>{
    const username = await this.validateUserPassword(validateUserDto);
    // console.log(username);
    if(!username){
      throw new UnauthorizedException('Invalidate credentials');
    }
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    const showroom = await this.userRepository.createQueryBuilder('user')
    .select('showroomShowroomId') 
    .where('user.user_name = :username', {username})
    .getRawOne();  

    
    // console.log(role);   
    const userId = await this.userRepository.createQueryBuilder('user')
    .select('user_id') 
    .where('user.user_name = :username', {username})
    .getRawOne();    
    
    const role = await this.userRepository.createQueryBuilder('user')
    .leftJoin(Role, 'role', 'user.roleRoleId = role.role_id')
    .select('role.role_name') 
    .where('user.user_name = :username', {username})
    .getRawOne();   
    return { userId,accessToken, showroom, role };
  } 

  async getUsers(showroomId: number):Promise<GetUserDto[]>{
    const getData = this.userRepository.createQueryBuilder('user')
    .leftJoin(Role, 'role', 'user.roleRoleId = role.role_id')
    .select(['user_id as userId','user_name as username','email','role.role_name as role'])
    .where('user.showroomShowroomId = :showroomId',{showroomId});
    const result = await getData.getRawMany();
    return result;
  }

  async getUserById(userId: number):Promise<User>{
    return await this.userRepository.findOneBy({user_id:userId});
  }

  async deleteUser(userId: number): Promise<DeleteResult>{
    return this.userRepository.delete({user_id:userId});
  }

  async updateUserDetails(updateUserDto:UpdateUserDto): Promise<User>{
    const { user_Id,user_name, email, role } = updateUserDto;
    const user = await this.userRepository.findOneBy({user_id:user_Id});
    user.user_name = user_name;
    user.email = email;
    user.role.role_name = role;
  return await this.userRepository.save(user);
  }

  private async hashPassword(password: string, salt: string): Promise<string>{
    return bcrypt.hash(password,salt);
  }

  private async validateUserPassword( validateUserDto: ValidateUserDto ): Promise<string>{
  const { username, password} = validateUserDto
  const user = await this.userRepository.findOne({where: { user_name: username }});
  // console.log(user);
  if (user && await user.validatePassword(password)) {
    return user.user_name;
  }
  else {
    return null;
  }

  }
  
}
