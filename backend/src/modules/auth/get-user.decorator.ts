import { createParamDecorator } from "@nestjs/common";
import { User } from "./entities/User";

export const GetUser = createParamDecorator((data,req): User => {
    return req.user;
});