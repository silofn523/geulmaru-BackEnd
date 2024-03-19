/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateBoardsTitleDto {
   // @IsDate()
   // @IsNotEmpty()
   // img: Date;

   @IsNotEmpty()
   title: string;// 작품 제목

   @IsNotEmpty()
   des: string;// 작품 소개

   @IsNotEmpty()
   categories: string;// 카테고리
}
