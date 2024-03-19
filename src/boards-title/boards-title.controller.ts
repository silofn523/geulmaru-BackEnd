/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body,  Param, Delete, UseInterceptors, UploadedFile, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsTitleService } from './boards-title.service';
import { CreateBoardsTitleDto } from './dto/create-boards-title.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entity/user.entity';
import { GetUser } from 'src/user/get-user-decorator';

@Controller('boards-title')
@UseGuards(AuthGuard())
export class BoardsTitleController {
  constructor(
    private readonly boardsTitleService: BoardsTitleService
    ) {}

  // @Post('/upload')
  // @UseInterceptors(FilesInterceptor('image'))
  // createBoardTitle(@UploadedFile() image: Express.Multer.File,
  // //  @Body() createBoardsTitleDto: CreateBoardsTitleDto
  //  ) {
  //   console.log(image)
  //   // return this.boardsTitleService.createBoardTitle(image, createBoardsTitleDto);
  //   return image;
  // }
  @Post('/uploada')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(ValidationPipe)
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBoardsTitleDto: CreateBoardsTitleDto,
    @GetUser() user: User,
    ) {
  console.log(file);
  return this.boardsTitleService.createBoardTitle(createBoardsTitleDto, user);
}


  @Get()
  findAll() {
    return this.boardsTitleService.findAll();
  }

  @Get(':id')
  getOneBoardTitle(@Param('id') id: number) {
    return this.boardsTitleService.getOneBoardTitle(id);
  }

  @Delete(':id')
  deleteBoardTitle(@Param('id') id: number, @GetUser() user: User) {
    return this.boardsTitleService.deleteBoardTitle(id, user);
  }
}
