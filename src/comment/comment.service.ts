/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentDB: Repository<Comment>,
  ) {}

  // 릴레이 소설
  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { title } = createCommentDto; 

    const comment = this.commentDB.create({ title })

    await this.commentDB.save(comment); 
    return comment; 
  }

  async findAll():Promise<Comment[]> {
    return this.commentDB.find();
  }
}
