/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { UpdateUserDto, UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
   constructor(
      private readonly userService: UserService
   ) {}

   @Get()
   getAllUser() {
      return this.userService.getAllUser()
   }

   @Get(':id')
   getOneUser(@Param('id') id: number) {
      return this.userService.getOneUser(id)
   }

   @Get(':id/me')
   @UseGuards(AuthGuard())
   myProfile(@Param('id') id: number) {
      return this.userService.getMyProfile(id)
   }

   @Post('/signup')
   createUser(@Body(ValidationPipe) userDto: UserDto) {
      return this.userService.createUser(userDto)
   }

   @Post('/signin')
   singIn(@Body() userDto: UserDto) {
      return this.userService.sinIn(userDto)
   }

   @Post('/test')
   @UseGuards(AuthGuard())
   test(@Req() req) {
      console.log('req',req);
   }

   @Delete(':id')
   deleteUser(@Param('id') id: number) {
      return this.userService.deleteUser(id)
   }

   @Delete(':id/del')
   @UseGuards(AuthGuard())
   deleteMyProfile(@Param('id') id: number) {
      return this.userService.deleteMyProfile(id)
   }

   @Patch(':id')
   @UseGuards(AuthGuard()) 
   updateUser(
      @Param('id') id: number,
      @Body(ValidationPipe) updateUserDto: UpdateUserDto,
   ) {
      return this.userService.updateUser(id,updateUserDto)
   }
}
