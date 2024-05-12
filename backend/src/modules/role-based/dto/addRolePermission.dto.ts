import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";
// import { PermissionDto } from "./permission.dto";

export class PermissionsDto{
    @IsBoolean()
    ADD: boolean;

    @IsBoolean()
    DELETE: boolean;

    @IsBoolean()
    UPDATE: boolean;

    @IsBoolean()
    VIEW: boolean;
}

export class ComponentPermissionDto{
    @IsNotEmpty()
    component_id: number;
    @IsNotEmpty()
    permissions: PermissionsDto;
}

export class AddRolePermissionDto{
    @IsNotEmpty()
    componentPermissionDto: ComponentPermissionDto[];

    @IsNotEmpty()
    roleName: string;

    @IsNotEmpty()
    showroomId: number;
}