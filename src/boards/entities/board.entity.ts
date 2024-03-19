/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { BoardsTitle } from "src/boards-title/entities/boards-title.entity";
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne} from 'typeorm';

/* eslint-disable prettier/prettier */
@Entity()
export class Board extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   @IsNotEmpty()
   title: string;// 회차 제목

   @Column()
   @IsNotEmpty()
   des: string;// 회차 내용

   @ManyToOne(() => BoardsTitle, boardTitle => boardTitle.boards, { eager: false })
   boardTitle: BoardsTitle;
}