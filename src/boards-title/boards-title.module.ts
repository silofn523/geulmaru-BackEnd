/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BoardsTitleService } from './boards-title.service';
import { BoardsTitleController } from './boards-title.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsTitle } from './entities/boards-title.entity';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from 'src/user/user.module';
import { Board } from 'src/boards/entities/board.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardsTitle, Board]),
    MulterModule.register({
      dest: '/uploada',
    }),
    UserModule
  ],
  controllers: [BoardsTitleController],
  providers: [BoardsTitleService],
})
export class BoardsTitleModule {}
