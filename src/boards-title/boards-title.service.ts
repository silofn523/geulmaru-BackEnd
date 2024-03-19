/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { CreateBoardsTitleDto } from './dto/create-boards-title.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardsTitle } from './entities/boards-title.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { Board } from 'src/boards/entities/board.entity';

@Injectable()
export class BoardsTitleService {
  constructor(
    @InjectRepository(BoardsTitle)
    private boardTitlesDB: Repository<BoardsTitle>
  ) {}

  //작품 부분
  async createBoardTitle(createBoardsTitleDto: CreateBoardsTitleDto, user: User): Promise<BoardsTitle> {
    const { title, des, categories } = createBoardsTitleDto;
    // const boardTitle = new BoardsTitle;
    // boardTitle.title = title;
    // boardTitle.des = des;
    // boardTitle.categories = categories;
    // boardTitle.image = image.path;
    const boardTitle = this.boardTitlesDB.create({
      title,
      des,
      categories,
      user,
    });

    const PostBoardTitle = await this.boardTitlesDB.save(boardTitle);
    return PostBoardTitle;
  }

  async findAll(): Promise<BoardsTitle[]> {
    return await this.boardTitlesDB.find();
  }

  async getOneBoardTitle(id: number): Promise<BoardsTitle> {
    const found = await this.boardTitlesDB.findOneBy({ id })

    if (!found) { 
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }

    return found;
  }

  async deleteBoardTitle(id: number, user: User): Promise<{ success: boolean }> {
    const resuit = await this.boardTitlesDB.delete({ id,user })

    if(resuit.affected === 0) { 
      throw new NotFoundException(`Can't find Board with id ${id}`)
    } 

    return {
      success: true
    }
  }
}
