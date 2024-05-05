import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { Component } from "./entities/component";
import { Permission } from "./entities/permission";
import { Type } from "class-transformer";

// class PermissionsDto{
//     @IsOptional()
//     permission: Permission;
// }

export class GetComponentWithPermissionDto{
    @IsNotEmpty()
    component: Component;

   @IsOptional()
    permissions: Permission[];


    
}