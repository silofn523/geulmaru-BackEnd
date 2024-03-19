/* eslint-disable prettier/prettier */
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Comment extends BaseEntity {
   @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  title: string;
}
