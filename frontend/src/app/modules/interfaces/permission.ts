
export interface ModulePermission {
    ADD: boolean;
    DELETE: boolean;
    UPDATE: boolean;
    VIEW: boolean;
}

// export interface RolePermission {
//     roleName: string;
//     component_id: number; // Assuming module_id is a number
//     permissions: ModulePermission;
// }

export interface RolePermission {
    modulePermissions: { component_id: number; permissions: ModulePermission }[];
    roleName: string;
    // showroomId: number;
  }