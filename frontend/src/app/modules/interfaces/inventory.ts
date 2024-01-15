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
  mileage:number;
  showroomId: any;
  attributeValueId:number[];
  value: string[];
  stockAttributeValue : IStockAttributeValue[];

}

export interface IVehicleDetails {
  
  inventoryId: number;
  vehicleMake: string;
  vehicleModel: string;
  vehicleVariant: string;
  modelYear: number;
  demand: number;
  mileage: number;
  
  
  
}

export interface IStockAttributeValue {  // zaid kaa kaam
  id: number;
  value: any;
  inventoryInventoryId:number;
  multiValueAttributeMultiValueId:number;
  vehicleTypeAttribute: IVehicleTypeAttributeDto;
}

export interface IVehicleTypeAttributeDto {
  attribute_id: number; 
  attribute_name: number; 
  input_type: string;
  multiVals: IMultiValue[]; 
}
export interface IMultiValue {
  attribute_value: string;
  multi_value_id: number
}
