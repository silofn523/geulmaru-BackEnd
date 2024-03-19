/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
// import { ConfigService } from "@nestjs/config";

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor (
      @InjectRepository(User)
      private userDB: Repository<User>,
      // private configService: ConfigService,
   ) {
      super({
         // secretOrKey: configService.get('JWT_SECRET', 'JWT'),
         secretOrKey: process.env.JWT_SECRET,
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
      });
   }

   async validate(payload) {
      const { username } = payload;
      const user: User = await this.userDB.findOneBy({ username });

      if (!user) {
         throw new UnauthorizedException();
      }

      return user;
   }
}