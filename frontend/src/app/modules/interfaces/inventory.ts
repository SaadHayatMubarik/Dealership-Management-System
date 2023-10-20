export interface IVehicleType {
  vehicleTypeId: number;
  vehicleTypeName: string;
}

export interface DeleteIVehicleType{
  vehicleTypeName: string;
}

export interface IVehicleTypeAttribute {
  vehicleTypeAttributeId: number;
  attributeName: string;
  inputType: string;
  isRequired: boolean;
  vehicleTypeId: number;
}

export interface IInventory {}
