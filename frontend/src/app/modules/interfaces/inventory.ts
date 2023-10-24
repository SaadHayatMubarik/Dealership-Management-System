export interface IVehicleType {
  vehicleTypeId: number;
  vehicleTypeName: string;
}

export interface DeleteIVehicleType{
  vehicleTypeName: string;
}

export interface IVehicleTypeAttribute {
  vehicleTypeAttributeId: number;
  attributeValue:string;
  attributeName: string;
  inputType: string;
  vehicleTypeName: string;
}

export interface IInventory {
vehicleTypeName: string;
vehicleMake: string;
vehicleModel: string;
vehicleVariant: string;
vehicleChasisNo: string;
costPrice:number;
demand: number;
dateOfPurchase: Date;
bodyColor: string;
engineNo: string;
comments: string;
grade:number;
status: string;
regNo: string;
}
