/* eslint-disable prettier/prettier */
import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Board } from "./entities/board.entity";
;


export const GetBoard = createParamDecorator((date, ctx: ExecutionContext): Board => {
   const req = ctx.switchToHttp().getRequest();
   return req.boards;
})