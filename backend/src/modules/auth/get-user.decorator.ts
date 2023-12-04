import { createParamDecorator } from "@nestjs/common";
import { User } from "./entity/User";
// import { User } from "./entities/User";

export const GetUser = createParamDecorator((data,req): User => {
    // console.log(data);
    // console.log(req);
    return req.user;
});