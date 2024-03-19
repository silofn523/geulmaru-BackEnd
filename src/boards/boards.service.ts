/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { BoardsTitle } from 'src/boards-title/entities/boards-title.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardDB: Repository<Board>,
  ) {}

  //회차부분
  async createBoard(
    createBoardDto: CreateBoardDto,
    boardTitle: BoardsTitle,
  ): Promise<Board> {
    const { title, des } = createBoardDto;

    const board = this.boardDB.create({
      title,
      des,
      boardTitle,
    });

    const PostBoard = await this.boardDB.save(board);
    return PostBoard;
  }

  async findAll(): Promise<Board[]> {
    return await this.boardDB.find();
  }

  async getBoardById(id: number, boardTitle: BoardsTitle) {
    const found = await this.boardDB.findOneBy({ id, boardTitle });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async deleteBoard(id: number) {
    return await `This action removes a #${id} board`;
  }
}
