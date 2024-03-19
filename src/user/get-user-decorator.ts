/* eslint-disable prettier/prettier */
import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "./entity/user.entity";

export const GetUser = createParamDecorator((date, ctx: ExecutionContext): User => {
   const req = ctx.switchToHttp().getRequest();
   return req.user;
})