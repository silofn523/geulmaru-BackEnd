/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { Board } from './entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsTitleModule } from 'src/boards-title/boards-title.module';
import { BoardsTitle } from 'src/boards-title/entities/boards-title.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board,BoardsTitle]),
    BoardsTitleModule
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
