import { IInvestor, ISeller } from ".";

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
  sellerId: any;
  investment: investment[];
}

// export interface investment {
//   investment: {investor_id:number , investor_name: string; investmentAmount: number}[];
// }

export interface investment {
 investor_id:number;
 investor_name: string; 
 investmentAmount: number;
}

export interface ISellInventory {
  inventoryId? : number;
  vehicleType? : any;
  vehicleMake? : string;
  vehicleModel? : string;
  vehicleVariant? : string;
  modelYear? : number;
  vehicleChasisNo? : string;
  costPrice? : number;
  demand? : number;
  dateOfPurchase? : string;
  dateOfSale? : string;
  bodyColor? : string;
  engineNo? : string;
  comments: string;
  grade: number;
  status? : string;
  regNo? : string;
  mileage: number;
  sellingPrice? : string;
  buyerId? : number;
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

export interface IStockAttributeValue {  
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
  multi_value_id: number;
  attribute_value: string;
  
}



