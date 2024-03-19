/* eslint-disable prettier/prettier */
import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { BoardsTitle } from "./entities/boards-title.entity";


export const GetBoardTitle = createParamDecorator((date, ctx: ExecutionContext): BoardsTitle => {
   const req = ctx.switchToHttp().getRequest();
   return req.boardTitle;
})