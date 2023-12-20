export interface IVehicleType {
  vehicleTypeName: string;
  showroomId: any;
}

export interface IVehicleTypeAttribute {
  vehicleAttributeValue: string[];
  vehicleAttributeName: string;
  attributeInputType: string;
  vehicleType: any;
  ShowroomId: any;
}

export interface IInventory {
  vehicleType:any;
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
  comments: string;
  grade: number;
  status: any;
  regNo: string;
  showroomId: any;

  stockAttributeValue : IStockAttributeValue[];

}

export interface IStockAttributeValue {
  id: number;
  value: any;
  inventoryInventoryId:number;
  multiValueAttributeMultiValueId:number;

  vehicleTypeAttribute : IVehicleTypeAttribute;
}
