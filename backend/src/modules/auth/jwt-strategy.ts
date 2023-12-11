import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtPayload } from "./jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
// import { User } from "./entities/User";
import { Repository } from "typeorm";
import { User } from "./entity/User";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
){
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey:'topSecret21',

    });
}

async validate(payload: JwtPayload){
    const { username } = payload;
    const user = await this.userRepository.findOne({ where: { user_name: username} });

    if(!user){
        throw new UnauthorizedException();
    }

    return user;
    }
}
