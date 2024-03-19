/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { GetBoardTitle } from 'src/boards-title/get-board-title';
import { BoardsTitle } from 'src/boards-title/entities/boards-title.entity';

@Controller('boards')
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService
    ) {}

  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto, @GetBoardTitle() boardTitle: BoardsTitle) {
    return this.boardsService.createBoard(createBoardDto, boardTitle);
  }

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  getBoardById(@Param('id') id: number, @GetBoardTitle() boardTitle: BoardsTitle) {
    return this.boardsService.getBoardById(id, boardTitle);
  }

  @Delete(':id')
  deleteBoard(@Param('id') id: number) {
    return this.boardsService.deleteBoard(id);
  }
}
