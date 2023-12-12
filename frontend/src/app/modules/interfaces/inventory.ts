export interface IVehicleType {
  vehicleTypeId: number;
  vehicleTypeName: string;
  ShowroomId?: number;
}



export interface IVehicleTypeAttribute {
  vehicleAttributeValue: string[];
  vehicleAttributeName: string;
  attributeInputType: string;
  vehicleType: any;
  ShowroomId?: number;
}

export interface IInventory {
  vehicleMake: string;
  vehicleModel: string;
  vehicleVariant: string;
  modelYear: number;
  vehicleChasisNo: string;
  costPrice: number;
  demand: number;
  dateOfPurchase: string;
  dateOfSale: string;
  bodyColor: string;
  engineNo: string;
  grade: number;
  status: string;
  regNo: string;
  ShowroomId?: number;
}
