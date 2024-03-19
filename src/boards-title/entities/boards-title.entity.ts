/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/user/entity/user.entity';
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class BoardsTitle extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number

   // @Column()
   // image: string;

   @Column()
   @IsNotEmpty()
   title: string;// 작품 제목

   @Column()
   @IsNotEmpty()
   des: string;// 내용

   @Column()
   @IsNotEmpty()
   categories: string;// 카테고리

   @ManyToOne(() => User, user => user.boardTitle, { eager: false })
   user: User;

   @OneToMany(() => Board, boards => boards.boardTitle, { eager: true })
   boards: Board[];
}
