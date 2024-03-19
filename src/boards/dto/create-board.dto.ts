/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";


export class CreateBoardDto {
   @IsNotEmpty()
   title: string;// 회차 제목
   
   @IsNotEmpty()
   des: string;// 회차 내용
}
