/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"; // yarn add class-validator

export class UserDto {
   @IsString() 
   @MinLength(4)
   @MaxLength(15)
   @IsNotEmpty()
   username : string;

   @IsString()
   @IsNotEmpty()
   @MinLength(8)
   @MaxLength(20)
   @Matches(/^[a-z A-Z 0-9 !? @]*$/,{ 
      message: 'password only accepts english and number and !? and @' 
   })
   password : string;

   @IsEmail()
   @IsString()
   @IsNotEmpty()
   @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: 'email :('
   })
   email: string;
}

export class UpdateUserDto {
   @IsOptional()// 선택적 핑드
   // @IsString() // username이 타입이 스트링인지 유효성 검사
   @MinLength(4) // username의 최소 글자수
   @MaxLength(15)// username의 최대 글자 수
   username? : string;
}