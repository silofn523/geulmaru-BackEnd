/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto, UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
   constructor(
      @InjectRepository(User)
      private userDB: Repository<User>,
      private jwt: JwtService,
   ) {}

   async getAllUser(): Promise<User[]> {
      return await this.userDB.find()
   }

   async getOneUser(id: number): Promise<User> {
      const user =  await this.userDB.findOneBy({ id })
      
      if (!user) {  
         throw new NotFoundException(`Can't find user with id ${id}`)
      }
      return user
   }

   async getMyProfile(id: number): Promise<User> {
      const user =  await this.userDB.findOneBy({ id })
      
      if (!user) {  
         throw new NotFoundException(`Can't find user with id ${id}`)
      }
      return user
   }

   async createUser(userDto: UserDto): Promise<{ success: boolean }> {
      const { username, password, email} = userDto;

      await this.checkUserEmail(email);

      const salt = await bcrypt.genSalt(); 
      const hashed_PW = await bcrypt.hash(password, salt)


      const user = this.userDB.create({ username, password: hashed_PW, email })

      try {
         await this.userDB.save(user)

      } catch (err) { 
         if (err.code === '23505') { 
            throw new ConflictException('Existing username')

         } else { 
            throw new InternalServerErrorException();
            
         }
      }
      return {
         success: true
      }
   }

   async sinIn(userDto: UserDto) {
      const { username, password } = userDto;
      const user = await this.userDB.findOneBy({ username })

      if (!user) {
         throw new UnauthorizedException(`Can't find user with username ${username}`)
      }

      if (user && (await bcrypt.compare(password, user.password))) {
         const payload = { username };
         const accessToken = await this.jwt.sign(payload);

         return { accessToken };
      } else {
         throw new UnauthorizedException('login failed')
      }
   }

   async deleteUser(id: number): Promise<{ success: boolean }> {
      const user = await this.userDB.delete({ id })
        
      if(user.affected === 0) {
          throw new NotFoundException(`Can't find user with id ${id}`)
      }
      return {
         success: true
      }
   }

   async deleteMyProfile(id: number): Promise<{ success: boolean }> {
      const user = await this.userDB.delete({ id })
        
      if(user.affected === 0) {
          throw new NotFoundException(`Can't find user with id ${id}`)
      }
      return {
         success: true
      }
   }


   async checkUserEmail(email: string): Promise<void>{
      const existingEmail = await this.userDB.findOneBy({ email })
      if (existingEmail) {
         throw new ConflictException('Email already exists');
       }
   }

   async updateUser(id: number, updateUserDto: UpdateUserDto):Promise<{ success: boolean }> {

   await this.getOneUser(id)

   const result = await this.userDB.update(
      { id }, 
      updateUserDto
      );

     if (result.affected) { // ffected 값이 1이면 트루 값 반환 
         return {
           success: true
         }
     } else {
         return {
           success: false // affected 값이 0이면 즉, 업뎃하려는 유저 아이디가 없으면 false값 반환
         }
     }
   }
}
